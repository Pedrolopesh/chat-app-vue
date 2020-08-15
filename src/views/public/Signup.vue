<template>
    <div>

        <b-container class="bv-example-row mt-9">
            <b-row class="brake-small">
                <b-col>
                    <img src="../../../public/card-signup.png" class="ac img-login">
                    <!-- <span class="ac" v-html="Svgs.helpDelivreyLogo"></span> -->
                    <!-- <p>Um app para te ajudar no seu dia dia em casa</p> -->
                </b-col>


                <b-col>
                    <b-card class="p5 card-style-1 mt-4 mb-7">
                        <h2>Cadastro</h2>

                        <div class="centerx mw-w-50 ac">
                            <vs-input class="ac mt-5" type="text" placeholder="Nome" v-model="userForm.name"/>
                            <vs-input class="ac mt-5" type="text" placeholder="Email" v-model="userForm.email"/>
                            <vs-input class="ac mt-5" type="number" placeholder="phone" v-model="userForm.phone"/>
                                <vs-input
                                    type="password"
                                    class="mt-5 signup-input"
                                    v-model="userForm.password"
                                    label-placeholder="Senha"
                                    :progress="getProgress"
                                    :visiblePassword="hasVisiblePassword"
                                    icon-after
                                    @click-icon="hasVisiblePassword = !hasVisiblePassword">
                                     
                                     <template #icon>
                                        <span v-if="!hasVisiblePassword"><BIconEye/></span>
                                        <span v-else><BIconEyeSlash/></span>
                                    </template>

                                    <template v-if="getProgress >= 100" #message-success>
                                    Secure password
                                    </template>

                                </vs-input>
                        </div>

                        <vs-button @click="signup" class="mt-4 ac" type="gradient">Cadastrar</vs-button>

                        <span class="display-b mt-4">
                            já possui cadastro?
                            <a class="blue-link" @click="goToLogin()">faça o login</a>
                        </span>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
import Svgs from '../../assets/svgs/svgSet'
import sweetAlert from 'sweetalert2';

export default {
    data:() => ({
        url:process.env.VUE_APP_PROD_URL,
        Svgs:Svgs,

        value: '',
        hasVisiblePassword: false,

        userForm:{
            name:'',
            email:'',
            phone:'',
            password:''
        }
    }),

    computed: {
        getProgress() {
          let progress = 0

          // at least one number

          if (/\d/.test(this.userForm.password)) {
            progress += 20
          }

          // at least one capital letter

          if (/(.*[A-Z].*)/.test(this.userForm.password)) {
            progress += 20
          }

          // at menons a lowercase

          if (/(.*[a-z].*)/.test(this.userForm.password)) {
            progress += 20
          }

          // more than 5 digits

          if (this.userForm.password.length >= 6) {
            progress += 20
          }

          // at least one special character

          if (/[^A-Za-z0-9]/.test(this.userForm.password)) {
            progress += 20
          }

          return progress
        }
      },

    
    methods: {
        goToLogin(){
            this.$router.push('/Login')
        },

        signup(){
            let body = {
                name:this.userForm.name,
                email:this.userForm.email,
                phone:this.userForm.phone,
                password:this.userForm.password
            }

            this.$http.post(this.url + '/signup', body)
            
            .then(resp => {
            

                if(resp.data.success == true){

                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('id', resp.data._id)

                sweetAlert.fire({
                    icon: 'success',
                    title: 'Usuário criado com sucesso',
                    showConfirmButton: true
                })
                
                this.$router.push('/About')
                
                }else{

                    sweetAlert.fire({
                        icon: 'error',
                        title: 'ops! algo deu errado.',
                        showConfirmButton: true
                    })

                }


            })
        }
    },
}
</script>