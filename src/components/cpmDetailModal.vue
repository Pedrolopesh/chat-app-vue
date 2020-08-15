<template>
    <div>
<!-- 
        <div v-if="userRequestData == '' ">
            <h3>Carregando...</h3>
            <b-spinner label="Spinning"></b-spinner>
        </div> -->

                <h3 class="mt-3 mb-3">Pedido: {{ userRequestData.name }}</h3>

                <div v-if="userRequestData.user[0].name != null ">
                    <span>{{ userRequestData.user[0].name }}</span>
                    <b-avatar class="ml-2" :src='userRequestData.user[0].imageProfile'></b-avatar>
                </div>

                <div class="p10">
                    <BIconCart3 class="mr-1"/>
                    <span>{{ userRequestData.placeName }}</span>
                </div>

                <div class="p10">
                    Descrição:
                    <span>{{ userRequestData.description }}</span>
                </div>

                <div class="p10">
                    Taxa para entrega:
                    <strong>R$ {{ userRequestData.fee }}</strong>
                </div>

                <div class="p10">
                    <BIconGeo class="mr-1"/>
                    <span>{{ userRequestData.address }}</span>
                </div>

                <div v-if="requestPreferences == false">

                    <vs-button size="large" @click="iniciateChat(userRequestData)" class="mt-4 ac" color="rgb(59,222,200)" type="gradient">
                        Iniciar Chat
                        <BIconChat class="ml-2 icon-size-20"/>
                    </vs-button>
               
                </div>

               <div v-else>

                <vs-button size="large" @click="attendRequestStatus(userRequestData)" class="mt-4 ac" color="rgb(59,222,200)" gradient>
                    Atendido
                    <BIconCheck2All class="ml-2 icon-size-20"/>
                </vs-button>

                <vs-button size="large" @click="cancelRequestStatus(userRequestData)" class="mt-4 ac" danger gradient>
                    Cancelar
                    <BIconX class="ml-2 icon-size-20"/>
                </vs-button>

               </div>

               <div v-if="userRequestData.status == 'completed'">
                    <vs-button size="large" @click="reopenRequestStatus(userRequestData)" class="mt-4 ac" warn gradient>
                        Reabrir Pedido
                    <BIconEject class="ml-2 icon-size-20"/>
                </vs-button>
               </div>

                <div>
                    <DetailMap/>
                </div>


        <vs-dialog blur v-model="redirectModal">
            <h1>Chat Criado</h1>
            <p>Você será redirecionado para a página de conversas</p>

            <b-spinner label="Spinning"></b-spinner>

        </vs-dialog>

        <vs-dialog blur v-model="optionsModal">
            <div class="p15">

                <h2>Quem atendeu ao seu pedio ?</h2>
                <p>Pedido alterado com sucesso</p>

                <b-form-select
                    class="mw-w-70"
                    v-model="selectedUser"
                    :options="userOptionsChats"
                    value-field="user_id"
                    text-field="name"
                >
                </b-form-select>

                <vs-button 
                    size="large" 
                    @click="answerRequest" 
                    class="mt-4 ac" 
                    warn 
                    gradient
                >
                    Confirma
                </vs-button>


            </div>
        </vs-dialog>
        

        <vs-dialog blur v-model="sucessModal">
            <h1>Sucesso</h1>
            <p>Pedido alterado com sucesso</p>
        </vs-dialog>
        
        <vs-dialog blur v-model="alertModal">
            <h1>alerta</h1>
            <p>Este pedido foi criado por você</p>
        </vs-dialog>
        
        <vs-dialog blur v-model="errorModal">
            <h1>alerta</h1>
            <p>Você já possui uma conversa com esse usuário</p>
        </vs-dialog>



    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { BIconCart3, BIconGeo, BIconChat, BIconX, BIconCheck2All, BIconEject } from 'bootstrap-vue';
import DetailMap from './cpmMap';
import sweetAlert from 'sweetalert2';


export default {

    components:{

        BIconCart3,
        BIconGeo,
        DetailMap,
        BIconChat,
        BIconX, 
        BIconCheck2All,
        BIconEject
 
    },

    data:() => ({

        errorModal: false,
        alertModal: false,
        redirectModal: false,
        sucessModal: false,
        optionsModal: false,

        requestPreferences: false,

        selectedUser: '',

        url:process.env.VUE_APP_PROD_URL,

        userOptionsChats:[]

    }),

    computed: {

        ...mapGetters({

            userData: 'userData',
            userChats: 'userChats',
            userRequestData: 'userRequestData',

        })

    },

    created() {
        this.checkTypeUser()
    },

    methods: {

        ...mapActions({
            changeUserChats: 'changeUserChats',
            changeUserData: 'changeUserData'
        }),

        checkTypeUser(){
            let logedId = localStorage.getItem('id')

            // console.log(logedId)
            // console.log(this.userRequestData)

            if(logedId == this.userRequestData.user[0]._id || logedId == this.userRequestData.user[0]){
                
                // console.log("IDs são iguais")
                this.requestPreferences = true

            }else{
                // console.log("IDs diferentes")
                
                this.requestPreferences = false
            
            }
        },
        

        iniciateChat(param){
            let logedId = localStorage.getItem('id')
            if(logedId == param.user[0]._id){
                console.log("IDs são iguais")
                
                this.alertModal = true

            }else{

                let objChat = {
                    user_response: param.user[0]._id,
                    user_origin: logedId,
                }

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                let hou = String(today.getHours())
                let min = String(today.getMinutes())

                today = dd + '/' + mm + '/' + yyyy + '-' + hou + ':' + min;

                let body = {
                    user_response: param.user[0]._id,
                    user_origin: logedId,
                    chatData:[{
                        sender: 'origin',
                        message:'olá, ainda precisa de uma ajuda com seu pedido',
                        timestamp: today
                    }]
                }


            this.$http.post(this.url + '/create/chat', body).then(response => {
                
                if(response.status == 400){
                    
                    
                    this.errorModal = true

                }else{
                    
                    console.log(response)
                    let body = {
                        request_id: this.userRequestData._id,
                        status: 'interest'
                    }
                    
                    this.$http.put(this.url + '/update/status', body)
                    .then(resp => {
                        // console.log("Foi")
                        if(resp.data.success == 200){
                            this.redirectModal = true
                        }else{
                            sweetAlert.fire({ icon: 'error', title: 'Erro ao iniciar conversa', showConfirmButton: false, timer: 1500 })
                        }
                    })

                    setTimeout( () => {this.$router.push('/ChatList')}, 10000);
                }
            
            })
            .catch(err => {
                console.log(err)
                sweetAlert.fire({ icon: 'error', title: 'Erro ao iniciar conversa', showConfirmButton: false, timer: 1500 })

                this.errorModal = true
            })

                // this.$store.commit("setChatData", objChat);
                // this.$router.push('/ChatList')


            }
        },

        reopenRequestStatus(param){
            
            let body = {
                
                request_id:param._id,
                status: 'new'

            }
            console.log(body)

            this.$http.put(this.url + '/update/status', body)
            .then(resp => {

                if(resp.status == 200){ 
                    this.$emit('propsFunction', false)
                    this.changeUserData()
                    sweetAlert.fire({ icon: 'success', title: 'Pedido alterado com sucesso', timer: 1500, showConfirmButton: false }) 
                }
                
                else{
                    this.$emit('propsFunction', false)
                    this.changeUserData()
                    sweetAlert.fire({ icon: 'error', title: 'Erro ao alterar pedido', showConfirmButton: false, timer: 1500 })
                }

            })

            .catch(err => {
                console.log(err)
                this.$emit('propsFunction', false)
                this.changeUserData()
                sweetAlert.fire({ icon: 'error', title: 'Erro ao alterar pedido', showConfirmButton: false, timer: 1500 })
            })
        },

        answerRequest(){

            let body = {
                status: 'completed',
                request_id: this.userRequestData._id,
                user_answered: this.selectedUser
            }

            this.$http.put(this.url + '/answer/request', body)
            .then(resp => {
                if(resp.data.success == true){
                    this.optionsModal = false
                    this.$emit('propsFunction', false)
                    sweetAlert.fire({ icon: 'success', title: 'Pedido alterado com sucesso', timer: 1500, showConfirmButton: false })
                    this.changeUserData()
                }

            })
        },

        cancelRequestStatus(param){
            console.log(param._id)
        },

        async attendRequestStatus(param){
            this.optionsModal = true

            let logedId = localStorage.getItem('id')
            this.$http.get(this.url + `/user/chats/${logedId}`).then(resp => {
                this.userOptionsChats = resp.data
            })
            
        //     let body = {

        //         request_id:param._id,
        //         status: 'taked'

        //     }
        //     console.log(body)
        //     this.$emit('closeModal', false)

        //     this.$http.put(this.url + '/update/status', body)
        //     .then(response => {

        //         // if(response.status == 200){

        //         //     sweetAlert.fire({
        //         //         icon: 'success',
        //         //         title: 'Pedido alterado com sucesso',
        //         //         showConfirmButton: true
        //         //     })

        //         // }

        //     })

        //     .catch(err => {
        //         console.log(err)

        //         // sweetAlert.fire({
        //         //     icon: 'error',
        //         //     title: 'ops! algo deu errado.',
        //         //     showConfirmButton: true
        //         // })

        //   })

        }
    },
       
}
</script>