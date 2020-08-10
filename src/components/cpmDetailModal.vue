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

                <div>
                    <BIconCart3 class="mr-1"/>
                    <span>{{ userRequestData.placeName }}</span>
                </div>

                <div>
                    Descrição:
                    <span>{{ userRequestData.description }}</span>
                </div>

                <div>
                    Taxa para entrega:
                    <strong>R$ {{ userRequestData.fee }}</strong>
                </div>

                <div>
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

               <div v-if="userRequestData.status == 'taked'">
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

                <vs-select placeholder="Select" class="ac" v-model="selectedUser">
                    <vs-option label="Vuesax" value="1"> Vuesax </vs-option>
                    <vs-option label="Vue" value="2"> Vue </vs-option>
                    <vs-option label="Javascript" value="3"> Javascript </vs-option>
                    <vs-option disabled label="Sass" value="4"> Sass </vs-option>
                    <vs-option label="Typescript" value="5"> Typescript </vs-option>
                    <vs-option label="Webpack" value="6"> Webpack </vs-option>
                    <vs-option label="Nodejs" value="7"> Nodejs </vs-option>
                </vs-select>

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
import { mapGetters } from 'vuex';
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

    }),

    computed: {

        ...mapGetters({

            userRequestData: 'userRequestData',

        })

    },

    created() {
        this.checkTypeUser()
    },

    methods: {

        checkTypeUser(){
            let logedId = localStorage.getItem('id')

            console.log(logedId)
            console.log(this.userRequestData)

            if(logedId == this.userRequestData.user[0]._id || logedId == this.userRequestData.user[0]){
                
                console.log("IDs são iguais")
                this.requestPreferences = true

            }else{
                console.log("IDs diferentes")
                
                this.requestPreferences = false
            
            }
        },
        

        iniciateChat(param){
            // console.log("ID DO PEDIDO")
            // console.log(param._id)
            
            // console.log("ID DO USUÀRIO QUE CRIOU O PEDIDO")
            // console.log(param.user[0]._id)

            // console.log("ID DO USUÀRIO QUE ESTÀ LOGADO")
            // console.log(id)

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

                    this.redirectModal = true

                    setTimeout( () => {this.$router.push('/ChatList')}, 10000);
                }
            
            })
            .catch(err => {
                console.log(err)
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
            .then(response => {

                if(response.status == 200){ this.sucessModal = true }

            })

            .catch(err => {
                console.log(err)

                if(response.status == 200){ this.errorModal = true }
          })
        },


        cancelRequestStatus(param){
            console.log(param._id)
        },

        attendRequestStatus(param){

            let body = {

                request_id:param._id,
                status: 'taked'

            }
            console.log(body)
            this.$emit('closeModal', false)

            this.$http.put(this.url + '/update/status', body)
            .then(response => {

                // if(response.status == 200){

                //     sweetAlert.fire({
                //         icon: 'success',
                //         title: 'Pedido alterado com sucesso',
                //         showConfirmButton: true
                //     })

                // }

            })

            .catch(err => {
                console.log(err)

                // sweetAlert.fire({
                //     icon: 'error',
                //     title: 'ops! algo deu errado.',
                //     showConfirmButton: true
                // })

          })

        }
    },
       
}
</script>