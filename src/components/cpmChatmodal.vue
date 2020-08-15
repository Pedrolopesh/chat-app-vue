<template>
    <div>

        <div>

        <div class="ac chat-container">



            <!-- <perfect-scrollbar> -->
          <div id="container-chat" v-if="chatMessages.length > 0" class="chat-content"> 


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

                <span v-if="i + 1 == chatMessages.length">
                  <!-- here we call the function if it is the last item of the array,
                  the problem is...this item is always here, so it would render anytime there was ANY update on the page...and we dont want that..
                  
                  so.... -->
                    {{testFunction()}}
                </span>


              </div>
          </div>
          <span id="lastSendedMessage"></span>
           

          </div>  
            <!-- </perfect-scrollbar> -->
        

            <div class="text-box-chat">
              <div class="display-f">
                  <textarea class="text-input-chat" v-model="newMessage"/> 
                  
                  <button type="submit" class="send-message-button">
                    <BIconCursor @click="createMessage()" class="mt-2 ml-2 cp send-message-icon"/>
                  </button>
                  
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
// import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import dayjs from 'dayjs';


export default {
  props:['chatId'],

    comments:{
      // PerfectScrollbar
    },
  
    data:() => ({
      
      socket: io(process.env.VUE_APP_PROD_URL),
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

        contentScrolled: false,
        // we se a variable to decide if we want to call the last message function or not

    }),
    computed: {
      
      ...mapGetters({
        
        userData: 'userData',
            chatById: 'chatById',
            selectedChatData: 'selectedChatData',

        }),

    },


    updated(){
      // alert('testeeeee ahhhhhh ahh')
    },

    created() {
      
      this.transformdate()
        this.loadChatById()

        let vm = this;
        this.socket.on('messageRecived', function(message) {
          // console.log(message)
          vm.newSocketMessage.push(message)
   
        })
    },

    methods: {
      testFunction(){
        if(!this.contentScrolled){
          // alert('ha, go go power rangers')
                this.scrollToLastMessage();
          this.contentScrolled = true;
          //  I et it to true right after calling the scroll to mesage function (so it will only run again IF we set it to alse with a new request)
        }
  
      },
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
              this.contentScrolled = false;
              //I eser the variable to false right after I call the get function to re dender the chat
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
        // this.scrollToLastMessage()

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

          if(logedId == this.chatCreator[0]._id){
            
            this.userType = "response"

          }else{
            
            this.userType = "origin"

          }
        },

      createMessage(){
        this.checkTypeUser()

            // var today = new Date();
            var now = dayjs()
            let time = now.format("HH:mm")
            let date = now.format("DD/MM/YYYY")

            let body = { 
              
              chat_id:this.chatId,

                chatData: {
                  sender: this.userType,
                  message: this.newMessage,
                  timestamp: date + '-' + time
                }
            }
          this.socket.emit('sendMessage', body.chatData);


          this.$http.put(this.url + '/send/message', body)
          .then(resp => {
            
            if(resp.status == 200){
              
              this.newMessage = ''
              setTimeout( () => { this.loadChatById() }, 500);
              
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

      },


      listenMessages(){
        
        let socket = this.socket
        this.socket.on('messageRecived', function(message) {
          
          this.originUserMessage.push(param)

        })

      },

      rendermessage(param){
        this.originUserMessage.push(param)
      },

      renderchatMessages(){
        this.chatMessages.push(this.selectedChatData)
      },

      scrollToLastMessage(){
        
        
        this.$nextTick(() => {
          // here we use "$nextTick so it will only excecute the content of this function on the next rander ..meaning ,the next render after our request (on v -for_)"
        let scrollContainer = document.querySelector('#container-chat')
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        // console.log(scrollContainer)

        })

       
      },
        
    },

    watch:{
      newSocketMessage(){
        setTimeout(() => (this.loadChatById()), 2000)
      }
    }
}
</script>