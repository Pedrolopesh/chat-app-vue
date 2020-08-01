<template>
    <div>

        <div>
            <!-- <h3>Live chat</h3> -->

      <div class="ac chat-container mb-5">



        <!-- <div class="header-container-chat">
          <h3 class="clr-whi display-b ml-2">Live chat</h3>
        </div> -->


        <!-- {{ selectedChatData.chatData }} -->  

        <!-- {{ chatId }} ? -->

        <!-- {{ chatMessages.length }} -->
        <div v-if="chatMessages.length > 0"> 


               <div v-for="(messageObj, i) in chatMessages" :key="i" class="p15">
       
      
          
            
          <!-- {{ item }}-->
            <div class="message-block">

              <div v-if="messageObj.sender == 'origin'">
                      <div v-if="chatOrigin.user_origin.imageProfile != '' ">
                        <b-avatar :src='chatOrigin.user_origin.imageProfile' class="mr-a display-b mt-3"></b-avatar>
                      </div>
                    <!-- <p>From sender ( {{messageObj.sender}})</p> -->
                    <span class="display-b alg-txt-s"> <strong>Usuário:</strong> {{ chatOrigin.user_origin.name }} </span>
                    <span class="display-b alg-txt-s"> <strong>mensagem:</strong> {{ messageObj.message }} </span>
                    <small class="display-b alg-txt-s">{{ messageObj.timestamp }}</small>
              </div> 

              <div v-else>
                      <!-- {{ chatResponder.user_response.imageProfile }} -->
                      <!-- <b-avatar :src='chatResponder.user_response.imageProfile' class="mr-a display-b mt-3"></b-avatar> -->

                      <div v-if="chatResponder.user_response.imageProfile != '' ">
                        <b-avatar :src='chatResponder.user_response.imageProfile' class="mr-a display-b mt-3"></b-avatar>
                      </div>

                      <!-- <p>From sender ( {{messageObj.sender}})</p> -->
                      <span class="display-b alg-txt-s"> <strong>Usuário:</strong> {{ chatResponder.user_response.name }} </span>
                      <span class="display-b alg-txt-s"> <strong>mensagem:</strong> {{ messageObj.message }} </span>
                      <small class="display-b alg-txt-s">{{ messageObj.timestamp }}</small>
              </div>
            


            </div>


          <!-- CARA QUE RESPONDE O CRIADO DO CHAT  -->
          <!-- <div class="chat-response-container mt-5">

          <b-avatar :src='item.user_response[0].imageProfile' class="mr-3 mt-3"></b-avatar>

            <div class="display-b"> 

              <div v-for="(item, i) in item.chatData" :key="i">
                <span v-if="item.sender == 'response' ">
                
                    <span>
                      <strong>mensagem:</strong> {{ item.message }}
                      <small class="display-b alg-txt-s">{{ item.timestamp }}</small>
                    </span>
                
                </span>
              </div>
            
            </div>

          </div> -->
          

          <!-- CRIADOR DO CHAT / PRIMEIRA PESSOA QUE MANDA MENSAGEM -->
          <!-- <div class="chat-origin-container mt-3">
          
            <b-avatar :src='item.user_origin[0].imageProfile' class="mr-3"></b-avatar>
            
            <div class="display-b">
              
              <div v-for="(item, i) in item.chatData" :key="i">
                
                <span v-if="item.sender == 'origin' ">
                
                    <span class="mt-2 display-b alg-txt-s">
                      <strong>mensagem:</strong> {{ item.message }}
                      <small class="display-b alg-txt-s">{{ item.timestamp }}</small>
                    </span>
                
                </span>
              
              </div>
            
            </div>
          
          </div> -->
         
         

            <!-- <span v-else-if="item.sender == 'response' ">
                <h3>mensagem minha</h3>
            </span> -->
            
        </div>

        </div>  
       

              <div class="text-box-chat">
          <div class="display-f">
              <textarea v-model="newMessage"/> 
              <BIconCursor @click="createMessage()" class="mt-2 ml-2 cp send-message-icon"/>
          </div>
        </div>



        <!-- MENSAGEM RECIBIDA -->

        <!-- <div class="body-container-chat" v-for="(item, i) in messagens" :key="i">
          <div class="message-sended-box">
            <span class="clr-whi alg-txt-s display-b">{{ item.sendedName }}</span>

            <span class="clr-whi alg-txt-s display-b mt-3">{{ item.message }}</span>
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
import sweetAlert from 'sweetalert2';



export default {
    props:['chatId'],
  
    data:() => ({
        
        // socket: io('http://localhost:3333'),
        messagens:[
          {sendedName:'Fernanda', SendedMessage:'olá pedro, esse vai ser o nosso chat', sendedTimestamp:'08:00'},
        ],

        newMessage:'',
        currentTimestamp:'',

        userType:'',

        url:process.env.VUE_APP_PROD_URL,

        chatMessages:[],
        chatOrigin: {},
        chatResponder: {},
        
        // chatId: 'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',

    }),
    computed: {

        ...mapGetters({
            
            userData: 'userData',
            chatById: 'chatById',
            selectedChatData: 'selectedChatData',

        }),

    },

    created() {
        // this.renderchatMessages()
        this.transformdate()
        this.loadChatById()
        // let vm = this;
        // this.socket.on('messageRecived', function(message) {
        //   console.log("AQUI")

        //   console.log(message)
        //   vm.originUserMessage.push(message)
   
        // })
    },

    methods: {
        ...mapActions({
            changeChatById: 'changeChatById',
        }),

        async loadChatById(){
          // alert('chat id is' + this.chatId)
          // let chatData = await this.changeChatById(this.chatId);
          // console.log(chatData)
          

          this.$http.get(this.url + `/chat/messages/${this.chatId}`)
          .then(response => {
           

             
              let resp = response.data;

              this.chatCreator = resp.user_response

              console.log(resp)

              let newOriginOBJ = {
                chat_data: resp.user_response, 
                user_origin: resp.user_origin[0]
              }
              this.chatOrigin = newOriginOBJ;


              let newResponderOBJ = {
                chat_data: resp.user_response, 
                user_response: resp.user_response[0]
              }
              this.chatResponder = newResponderOBJ


              this.chatMessages = resp.chatData;

            // this.selectedChatData = response.data
          })
          .catch(err => {
            console.log(err)
            sweetAlert.fire({
                icon: 'error',
                title: 'ops! algo deu errado.',
                showConfirmButton: true
            })
          })


        },

        transformdate() {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                let hou = String(today.getHours())
                let min = String(today.getMinutes())

                this.currentTimestamp =  today = dd + '/' + mm + '/' + yyyy + '-' + hou + ':' + min;
        },


        checkTypeUser(){
          let logedId = localStorage.getItem('id')
          // console.log("usuário logado = " + logedId)
          // console.log("Criador do chat = " + this.chatCreator)

          // console.log(this.chatCreator)
          if(logedId == this.chatCreator[0]._id){
            // console.log("Pessoa que responde / user_response")

            this.userType = "response"

          }else{
            
            this.userType = "origin"

            // console.log("Pessoa que manda primeira mensagem / criador do chat / user_origin")
          }

          // console.log("usuário que manda a mensagem")
          // console.log(logedId)

          // console.log("user_response")
          // console.log(this.selectedChatData.user_response[0]._id)
          
          // console.log("user_origin / criador do chart")
          // console.log(this.selectedChatData.user_origin[0]._id)


        },

      createMessage(){


        this.checkTypeUser()

            let body = { 

                chat_id:this.chatId,

                chatData: {
                  sender: this.userType,
                  message: this.newMessage,
                  timestamp: this.currentTimestamp
                }
            }

            console.log(body)


          // this.$http.post(this.url + '/create/chat', body)
          this.$http.put(this.url + '/send/message', body)
          .then(response => {
            console.log(response)
          })

        
        
        // console.log(this.chatData)
        
        // if(this.author.length && this.newMessage.length != ''){
          
        //   let MessageObject = {
        //     user_response: this.author,
        //     message: this.newMessage
        //   }

        //   this.socket.emit('sendMessage', MessageObject);
        //   // this.rendermessage(MessageObject)
        //   this.originUserMessage.push(MessageObject)

        // }

        this.loadChatById()

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

      rendermessage(param){
        this.originUserMessage.push(param)
      },

      renderchatMessages(){
        this.chatMessages.push(this.selectedChatData)
      }
        
    },
}
</script>