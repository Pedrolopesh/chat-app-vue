<template>
  <div>
      <h1>CHAT</h1>

      <div class="ac chat-container">

        <div class="header-container-chat">
          <h3 class="clr-whi display-b ml-2">Live chat</h3>
          <BIconX @click="closeChat()" class="clr-whi cp display-b ml-a close-icon"/>
        </div>

        <!-- MENSAGEM RECIBIDA -->
        <div class="body-container-chat" v-for="(item, i) in messagens" :key="i">
          <div class="message-sended-box">
            <span class="clr-whi alg-txt-s display-b">{{ item.sendedName }}</span>

            <span class="clr-whi alg-txt-s display-b mt-3">{{ item.SendedMessage }}</span>
          </div>
          <small class="alg-txt-s display-b">{{ item.sendedTimestamp }}</small>
        </div>
        <!-- MENSAGEM RECIBIDA -->


        <!-- MENSAGEM ENVIADA -->
        <div class="body-container-chat">
          <div class="ml-a message-send-box">
            <span class="alg-txt-s display-b">Pedro Lopes</span>

            <span class="alg-txt-s display-b mt-3">olá Fernanda</span>
          </div>
          <small class="alg-txt-e display-b">08:00</small>
        </div>
        <!-- MENSAGEM ENVIADA -->

        <!-- MENSAGEM -->
        <div class="text-box-chat">
          <div class="display-f">
              <vs-textarea v-model="newMessage"/> 
              <BIconCursor @click="createMessage()" class="mt-2 ml-2 cp send-message-icon"/>
          </div>
        </div>
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
        // socket: io('http://localhost:3333'),

        messagens:[
          {sendedName:'Fernanda', SendedMessage:'olá pedro, esse vai ser o nosso chat', sendedTimestamp:'08:00'}
        ]
    }),

    created(){

      // MENSAGEM ENVIADA
      // let ref = fb.collection('messages').orderBy('timestamp')
      // ref.onSnapshot(snapshot => {
        
      //   snapshot.docChanges().forEach(change => {
          
      //     if(change.type = 'added'){
      //       let doc = change.doc;

      //       this.messagens.push({
      //         id: doc.id,
      //         name: doc.data().name,
      //         message: doc.data().message,
      //         timestamp: moment(doc.data().timestamp).format('LTS')
      //       })

      //     }

      //   })

      // })
      // MENSAGEM ENVIADA

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
        }
      // createMessage(){
      //   if(this.newMessage){
      //     fb.collection('messages').add({
      //       message: this.newMessage,
      //       name: this.name,
      //       timestamp: Date.now()
      //     }).catch(err => {
      //       console.log(err)
      //     })
      //     this.newMessage = '';

      //   }else{
      //     alert("type some message first")
      //   }
      // }

      // createMessage(){
        
      //   if(this.author.length && this.newMessage.length != ''){
          
      //     let MessageObject = {
      //       authorName: this.author,
      //       authorMessage: this.newMessage
      //     }
      //     console.log(MessageObject)
      //     this.socket.emit('sendMessage', MessageObject);

      //     // this.$http.post(this.url + '/create/chat', body).then(response => {
      //     //   console.log(response)
      //     // })
      //   }

      // }
    }
}
</script>