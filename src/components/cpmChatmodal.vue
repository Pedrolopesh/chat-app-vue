<template>
    <div>

        <div>
            <!-- <h3>Live chat</h3> -->

      <div class="ac chat-container mb-5">



        <div class="header-container-chat">
          <h3 class="clr-whi display-b ml-2">Live chat</h3>
          <!-- <BIconX @click="closeChat()" class="clr-whi cp display-b ml-a close-icon"/> -->
        </div>


        <!-- {{ selectedChatData.chatData }} -->

        <div v-for="(item, i) in selectedChatData" :key="i">
            
          {{ item }}

            <!-- <span v-if="item.sender == 'origin' ">
                <h3>mensagem do outro</h3>
                <span>{{ item.message }}</span>
            </span> -->

            <!-- <span v-else-if="item.sender == 'response' ">
                <h3>mensagem minha</h3>
            </span> -->
            
        </div>



        <!-- MENSAGEM RECIBIDA -->

        <div class="body-container-chat" v-for="(item, i) in messagens" :key="i">
          <div class="message-sended-box">
            <span class="clr-whi alg-txt-s display-b">{{ item.sendedName }}</span>

            <span class="clr-whi alg-txt-s display-b mt-3">{{ item.message }}</span>
          </div>
          <small class="alg-txt-s display-b">{{ item.sendedTimestamp }}</small>
        </div>

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


        <div class="text-box-chat">
          <div class="display-f">
              <textarea v-model="newMessage"/> 
              <BIconCursor @click="createMessage()" class="mt-2 ml-2 cp send-message-icon"/>
          </div>
        </div>


        </div>

      </div>

        <!-- MENSAGEM RECIBIDA -->

        <!-- <div v-for="(item, i) in messagens" :key="i">
          <div >
            <span>{{ item.sendedName }}</span>

            <span>{{ item.SendedMessage }}</span>
          </div>
          <small>{{ item.sendedTimestamp }}</small>
        </div> -->

        <!-- MENSAGEM RECIBIDA -->

      </div>
</template>
<script>
import {
  mapGetters, mapActions
} from 'vuex';


export default {
    data:() => ({
        
        // socket: io('http://localhost:3333'),
        messagens:[
          {sendedName:'Fernanda', SendedMessage:'olá pedro, esse vai ser o nosso chat', sendedTimestamp:'08:00'},
        ],

        newMessage:'',

    }),
    computed: {

        ...mapGetters({
            
            userData: 'userData',
            selectedChatData: 'selectedChatData',

        }),

    },

    created() {
        // let vm = this;
        // this.socket.on('messageRecived', function(message) {
        //   console.log("AQUI")

        //   console.log(message)
        //   vm.originUserMessage.push(message)
   
        // })
    },

    methods: {
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
        
    },
}
</script>