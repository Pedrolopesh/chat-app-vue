<template>
    <div>

                <h3 class="mt-3 mb-3">Pedido: {{ userRequestData.name }}</h3>
                
                <div>
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

                <vs-button size="large" @click="iniciateChat(userRequestData)" class="mt-4 ac" color="rgb(59,222,200)" type="gradient">
                    Iniciar Chat
                    <BIconChat class="ml-2 icon-size-20"/>
                </vs-button>

                <div>
                    <DetailMap/>
                </div>


        <vs-dialog blur v-model="alertModal">
            <h1>alerta</h1>
            <p>Este pedido foi criado por você</p>
        </vs-dialog>



    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { BIconCart3, BIconGeo, BIconChat } from 'bootstrap-vue';
import DetailMap from './cpmMap'

export default {

    components:{
        BIconCart3,
        BIconGeo,
        DetailMap,
        BIconChat
    },

    data:() => ({
        stateDetailModal: false,
        alertModal: false,

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
            console.log("ID DO PEDIDO")
            console.log(param._id)
            
            console.log("ID DO USUÀRIO QUE CRIOU O PEDIDO")
            console.log(param.user[0]._id)

            let id = localStorage.getItem('id')
            console.log("ID DO USUÀRIO QUE ESTÀ LOGADO")
            console.log(id)

            if(id == param.user[0]._id){
                console.log("IDs são iguais")
                this.alertModal = true
            }else{

                let objChat = {
                    requet_id: param._id,
                    user_response: param.user[0]._id,
                    user_origin: id,
                }

                let body = {
                    request_id: param._id,
                    user_response: param.user[0]._id,
                    user_origin: id,
                    chatData:[{
                        sender: 'origin',
                        message:'olá, ainda precisa de uma ajuda com seu pedido'
                    }]
                }

            this.$http.post(this.url + '/create/chat', body).then(response => {

                console.log(response)
                localStorage.setItem('request_id', response.data.request_id)
                localStorage.setItem('user_origin', response.data.user_origin)
                localStorage.setItem('request_id', response.data.request_id)
                localStorage.setItem('chatData', response.data.chatData)
                localStorage.setItem('_id', response.data._id)
            
            })
            .catch(err => {
                console.log(err)
                sweetAlert.fire({
                    icon: 'error',
                    title: 'ops! algo deu errado.',
                    showConfirmButton: true
                })
            })

                // this.$store.commit("setChatData", objChat);
                // this.$router.push('/ChatList')


            }
        },
    },
       
}
</script>