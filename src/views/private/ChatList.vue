<template>
    <div>
        <componentHeader/>

            <!-- <ChatComponent/> -->


            <!-- {{ userData.chats }} -->
            <!-- {{ userData.chats[1] }} -->

            <!-- <button @click="consultUsers">teste</button> -->
            <!-- response: {{ responseData }}
            <br />
            no data: {{ noData }}
            <br /> -->
            <span v-if="responseData">
                <b-spinner label="Spinning"></b-spinner>
                <h3>Carregando...</h3>
            </span>

            <span class="mt-9 display-b" v-if="noData">
                <h3>Você ainda não iniciou nenhuma conversa 😪</h3>
            </span>


            <div @click="selectUser(item)" class="container-list-chats ac" v-for="(item, i) in items" :key='i'>

                        <!-- {{ item.user_origin }} -->
                        <!-- {{ item.user_response }} -->
                
                <div v-if=" userType == 'user_response' ">

                    <div v-for="(item, i) in item.user_response" :key="i">
                            <vs-button
                                class="display-b ac mt-2"
                                size="large"
                                gradient
                                warn
                                animation-type="scale"
                            >

                                <BIconEnvelope class="icon-size-20"/>
                                <span class="ml-2">{{ item.name }} </span>
                                <b-avatar class="ml-2" :src='item.imageProfile'></b-avatar>
                                
                                <template #animate >
                                    Send message 
                                </template>

                            </vs-button>
                    </div>
                    
                </div>

                <div v-else>
                    <div v-for="(item, i) in item.user_origin" :key="i">

                            <vs-button
                                class="display-b ac mt-2"
                                size="large"
                                gradient
                                warn
                                animation-type="scale"
                            >

                                <BIconEnvelope class="icon-size-20"/>
                                <span class="ml-2">{{ item.name }} </span>
                                <b-avatar class="ml-2" :src='item.imageProfile'></b-avatar>
                                
                                <template #animate >
                                    Send message 
                                </template>

                            </vs-button>
                    </div>
                </div>
            </div>


            <vs-dialog  prevent-close blur v-model="chatModal">


                <template #header>
                    <h3>
                    Chat
                    </h3>
                </template>

                <ChatModal :chatId='selectedChatId'/>

            </vs-dialog>


            <!-- <vs-dialog scroll overflow-hidden close v-model="chatModal" class="modal-chat-container"> -->
            

                <!-- <template #header>
                    <h3>
                    Chat
                    </h3>
                </template> -->

            
            <!-- </vs-dialog> -->


    </div>
</template>
<script>
import ChatComponent from '../../components/cpmLiveChat';
import componentHeader from '@/components/cpmHeader';
import ChatModal from '@/components/cpmChatmodal';
import Map from '@/components/cpmMap';
import { BIconEnvelope } from 'bootstrap-vue';

import {
  mapGetters, mapActions
} from 'vuex';


export default {
    data:() => ({
        step:1,
        // items:[
        //     {userName:'Pedro Lopes', userPicture:'https://placekitten.com/300/300'},
        //     {userName:'Fernanda', userPicture:'https://picsum.photos/500/500/?image=54'},
        // ],

        selectedChatId:'',

        userType:'',

        items:[],
        noData: false,
        chatModal: false,
        url:process.env.VUE_APP_PROD_URL,
        responseData: false,
    }),
    
    computed: {

        ...mapGetters({
            
            userData: 'userData',
            selectedChatData: 'selectedChatData',

        }),

    },

    components:{
        componentHeader,
        ChatComponent,
        BIconEnvelope,
        ChatModal,
        Map
    },

    created(){
        // this.checkItensData()
        this.checkAciveChats()
        
    },

    methods:{
        ...mapActions({
            
        }),

        checkAciveChats(){
            this.responseData = true
            // console.log(this.userData.chats)
            let logedId = localStorage.getItem('id')
            this.$http.get(this.url + `/user/${logedId}`).then(response => {
                
                let chats = response.data.chats

            for(let i in chats){
                
                let id = chats[i]._id
                
                this.$http.get(this.url + `/chat/messages/${id}`)
                
                .then(resp => {    
                    if(resp.data == ''){
                        this.responseData = false
                        this.noData = true
                    }else{
                        this.responseData = false
                        this.noData = false
                    }
                    this.checkTypeUser(resp.data)

                    this.items.push(resp.data)
                    // setTimeout( () => {  this.checkDatas() }, 200);
                })
                .catch(err => {
                    this.responseData = false
                    this.noData = true
                })
            }
            })
            .catch(err => {
                this.responseData = false
                this.noData = true
            })
        },

        checkTypeUser(param){

            let logedId = localStorage.getItem('id')

            // console.log(logedId)
            // console.log(param.user_origin[0]._id)
            // console.log(param.user_response[0]._id)

            if( logedId == param.user_origin[0]._id ){
                
                // console.log("User é origin")
                // console.log("IDS SÃO IGUAIS")
                // console.log(param.user_response[0])

                this.userType = 'user_response'
                this.requestPreferences = true
                
                // this.items.push(param.user_response[0])

            }else{
                
                // console.log("User é response")
                // console.log("IDs diferentes")
                // this.items.push(param.user_origin[0])
                
                this.userType = 'user_origin'
                this.requestPreferences = false
            
            }
        },

        checkItensData(){
            if(this.items == ''){
                this.consultUsers()
            }
        },

        selectUser(param){
            
            this.selectedChatId = param._id

            // this.$store.commit("setSelectedChatData", param);
            
            // console.log(this.chatSteper) 
            this.chatModal = true
            
        },
    }
}
</script>