<template>
    <div>

        <div>

        <div class="ac chat-container">



          <div v-if="chatMessages.length > 0" class="chat-content"> 

            <div v-for="(messageObj, i) in chatMessages" :key="i" class="p15">
              
              <div class="message-block">

                <div v-if="messageObj.sender == 'origin'">
                        <div v-if="chatOrigin.user_origin.imageProfile != '' ">
                          <b-avatar :src='chatOrigin.user_origin.imageProfile' class="mr-a display-b mt-3"></b-avatar>
                        </div>
                      <span class="display-b alg-txt-s"> <strong>Usuário:</strong> {{ chatOrigin.user_origin.name }} </span>
                      <span class="display-b alg-txt-s"> <strong>mensagem:</strong> {{ messageObj.message }} </span>
                      <small class="display-b alg-txt-s">{{ messageObj.timestamp }}</small>
                </div> 

                <div v-else>
                  <div v-if="chatResponder.user_response.imageProfile != '' ">
                    <b-avatar :src='chatResponder.user_response.imageProfile' class="mr-a display-b mt-3"></b-avatar>
                  </div>

                  <span class="display-b alg-txt-s"> <strong>Usuário:</strong> {{ chatResponder.user_response.name }} </span>
                  <span class="display-b alg-txt-s"> <strong>mensagem:</strong> {{ messageObj.message }} </span>
                  <small class="display-b alg-txt-s">{{ messageObj.timestamp }}</small>
                </div>


              </div>
              
          </div>

          </div>  
        

            <div class="text-box-chat">
              <div class="display-f">
                  <textarea class="text-input-chat" v-model="newMessage"/> 
                  
                  <BIconCursor @click="createMessage()" class="mt-2 ml-2 cp send-message-icon"/>
                  
              </div>
            </div>

          </div>

      </div>


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
        
        socket: io('http://localhost:3334'),
        messagens:[
          {sendedName:'Fernanda', SendedMessage:'olá pedro, esse vai ser o nosso chat', sendedTimestamp:'08:00'},
        ],

        newMessage:'',
        currentTimestamp:'',

        userType:'',

        url:process.env.VUE_APP_PROD_URL,

        newSocketMessage:[],

        chatMessages:[],
        chatOrigin: {},
        chatResponder: {},

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

        let vm = this;
        this.socket.on('messageRecived', function(message) {
          console.log("AQUI")

          console.log(message)
          vm.newSocketMessage.push(message)
   
        })
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
          this.socket.emit('sendMessage', body.chatData);

            console.log(body)


          // this.$http.post(this.url + '/create/chat', body)
          this.$http.put(this.url + '/send/message', body)
          .then(resp => {
            console.log(resp)

            if(resp.status == 200){

              setTimeout( () => { this.loadChatById() }, 500);
              setTimeout( () => { this.location = "#view"; }, 1000);
              
              // this.loadChatById()

            }else{

              alert('erro ao manda mensagem')

            }

          })

          .catch(err => {
            console.log(err)
            sweetAlert.fire({
                icon: 'error',
                title: 'ops! algo deu errado.',
                showConfirmButton: true
            })
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

    watch:{
      newSocketMessage(){
        setTimeout(() => (this.loadChatById()), 5000)
      }
    }
}
</script>