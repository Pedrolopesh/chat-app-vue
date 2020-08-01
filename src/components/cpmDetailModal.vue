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

                <vs-button v-if="requestPreferences != false" size="large" @click="iniciateChat(userRequestData)" class="mt-4 ac" color="rgb(59,222,200)" type="gradient">
                    Iniciar Chat
                    <BIconChat class="ml-2 icon-size-20"/>
                </vs-button>
               

               <div v-else>

                <vs-button size="large" @click="attendRequestStatus(userRequestData)" class="mt-4 ac" color="rgb(59,222,200)" type="gradient">
                    Atendido
                    <BIconCheck2All class="ml-2 icon-size-20"/>
                </vs-button>

                <vs-button size="large" @click="cancelRequestStatus(userRequestData)" class="mt-4 ac" danger type="gradient">
                    Cancelar
                    <BIconX class="ml-2 icon-size-20"/>
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
import { BIconCart3, BIconGeo, BIconChat, BIconX, BIconCheck2All } from 'bootstrap-vue';
import DetailMap from './cpmMap';
import sweetAlert from 'sweetalert2';


export default {

    components:{
        BIconCart3,
        BIconGeo,
        DetailMap,
        BIconChat,
        BIconX, BIconCheck2All
    },

    data:() => ({
        errorModal: false,
        alertModal: false,
        redirectModal: false,

        requestPreferences: false,

        url:process.env.VUE_APP_PROD_URL,

        
    }),

    computed: {

        ...mapGetters({
            userRequestData: 'userRequestData',
        })

    },

    methods: {

        // iniciateChat(param){
        //     console.log(param)
        // },

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
                this.requestPreferences = true

            }else{

                let objChat = {
                    user_response: param.user[0]._id,
                    user_origin: id,
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
                    user_origin: id,
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


        cancelRequestStatus(param){
            console.log(param._id)
        },

        attendRequestStatus(param){
            console.log(param._id)
        }
    },
       
}
</script>