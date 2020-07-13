<template>
  <div>
      <h1>CHAT</h1>

      <div class="ac chat-container mb-5">

        <div class="header-container-chat">
          <h3 class="clr-whi display-b ml-2">Live chat</h3>
          <BIconX @click="closeChat()" class="clr-whi cp display-b ml-a close-icon"/>
        </div>

        <!-- MENSAGEM RECIBIDA -->

        <!-- <div class="body-container-chat" v-for="(item, i) in messagens" :key="i">
          <div class="message-sended-box">
            <span class="clr-whi alg-txt-s display-b">{{ item.sendedName }}</span>

            <span class="clr-whi alg-txt-s display-b mt-3">{{ item.SendedMessage }}</span>
          </div>
          <small class="alg-txt-s display-b">{{ item.sendedTimestamp }}</small>
        </div> -->

        <!-- MENSAGEM RECIBIDA -->


        <!-- MENSAGEM ENVIADA -->

        <!-- <div class="body-container-chat" v-for="(item, i) in originUserMessage" :key="i">
          <div class="ml-a message-send-box">
            <span class="alg-txt-s display-b">{{ item.user_origin }}</span>

            <span class="alg-txt-s display-b mt-3">{{ item.message }}</span>
          </div>
          <small class="alg-txt-e display-b">{{ item.timeStamp }}</small>
        </div> -->

        <!-- MENSAGEM ENVIADA -->

        <!-- MENSAGEM -->

          {{ originUserMessage }}

        <div class="p15 display-b">
          <div v-for="(item, i) in originUserMessage" :key="i" class="alg-txt-s">

            <span><strong>{{ item.user_origin }}</strong></span>: <span>{{ item.message }}</span>

          </div>
        </div>


        <div class="text-box-chat">
          <div class="display-f">
              <textarea v-model="newMessage"/> 
              <BIconCursor @click="createMessage()" class="mt-2 ml-2 cp send-message-icon"/>
          </div>
        </div>

        <button @click="listenMessages()">
          messagem ?
        </button>

        <!-- MENSAGEM -->


      </div>
  </div>
</template>

<script>
import { BIconX, BIconCursor } from 'bootstrap-vue'
import {
  mapGetters, mapActions
} from 'vuex';
// import fb from '@/firebase/init';
// import moment from 'moment'

export default {
    data:() => ({
        newMessage:'',
        author:'Pedro Lopes',
        socket: io('http://localhost:3333'),

        messagens:[
          {sendedName:'Fernanda', SendedMessage:'olá pedro, esse vai ser o nosso chat', sendedTimestamp:'08:00'},
        ],

        originUserMessage: [],
        listenedMessage: ''
    }),

      computed: {

        ...mapGetters({
            chatData: 'chatData',
        }),

    },

    created(){
        let vm = this;
        this.socket.on('messageRecived', function(message) {
          console.log("AQUI")

          console.log(message)
          vm.originUserMessage.push(message)
   

        })


    },

    components:{
      BIconX,
      BIconCursor
    },
    methods: {
        ...mapActions({
            changeChatSteper: 'changeChatSteper'
        }),

        closeChat(){
          this.changeChatSteper(1)
        },

      listenMessages(){

        let socket = this.socket
        this.socket.on('messageRecived', function(message) {
          console.log("AQUI")
          // this.rendermessage(message)
          console.log(message)
          this.originUserMessage.push(param)

        })

      },

      createMessage(){
        
        // console.log(this.chatData)
        
        if(this.author.length && this.newMessage.length != ''){
          
          let MessageObject = {
            user_origin: this.author,
            message: this.newMessage
          }

          this.socket.emit('sendMessage', MessageObject);
          // this.rendermessage(MessageObject)
          this.originUserMessage.push(MessageObject)

        }

      },

      rendermessage(param){
        this.originUserMessage.push(param)
      }
        
        
          // console.log(objMessage)
            // let objMessage = {
            //   user_origin: this.author,
            //   message: this.newMessage,
            //   timeStamp: new Date()
            // }
    },

    watch: {
 
    },
}
</script>