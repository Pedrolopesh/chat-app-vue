<template>
    <div>
        <componentHeader/>

            <!-- <ChatComponent/> -->


            <!-- {{ userData.chats }} -->
            <!-- {{ userData.chats[1] }} -->

            <!-- <button @click="consultUsers">teste</button> -->


            <div @click="selectUser(item)" class="container-list-chats ac" v-for="(item, i) in items" :key='i'>


                
                <div v-for="(item, i) in item.user_response" :key="i">

                        <vs-button
                            class="display-b ac mt-2"
                            
                            gradient
                            style="min-width: 60px"
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


            <vs-dialog blur scroll v-model="chatModal">


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

        items:[],
        chatModal: false,
        url:process.env.VUE_APP_PROD_URL,
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
        // setTimeout( () => {this.consultUsers()}, 100);
    },

    methods:{
        ...mapActions({
            changeListOpenChats: 'changeListOpenChats',
        }),

        checkItensData(){
            if(this.items == ''){
                this.consultUsers()
            }
        },

        selectUser(param){
            
            console.log(param._id)
            this.selectedChatId = param._id

            // this.$store.commit("setSelectedChatData", param);
            
            // console.log(this.chatSteper) 
            this.chatModal = true
            
        },

        checkAciveChats(){
            
            // console.log(this.userData.chats)

            let teste = this.userData.chats

            for(let i in teste){

                let id = teste[i]._id
                
                this.$http.get(this.url + `/chat/messages/${id}`).then(response => {
                    console.log("fajfjasjfsajsfajp")
                    console.log(response.data)

                    this.items.push(response.data)
                })
            
            }
        }
    }
}
</script>