<template>
    <div>

        <b-container class="bv-example-row mt-7">
            <b-row class="brake-small">

                <b-col>
                    <!-- <img src="../../../public/card-login.png" class="ac img-login"> -->
                    <span class="ac icon-login" v-html="Svgs.helpDelivreyLogo"></span>
                </b-col>


                <b-col>
                    <b-card class="p5 card-style-1 mt-4 mb-6">
                        <h2>Login</h2>

                        <vs-input class="ac mt-4" type="text" placeholder="Email" v-model="email"/>
                        <!-- <vs-input class="ac mt-4" type="password" placeholder="Senha" v-model="password"/> -->

                        <div class="center content-inputs login-input">

                        <vs-input
                            type="password"
                            class="mt-5"
                            v-model="password"
                            label-placeholder="Password"
                            :visiblePassword="hasVisiblePassword"
                            icon-after
                            @click-icon="hasVisiblePassword = !hasVisiblePassword">

                            <template #icon>

                                <span v-if="!hasVisiblePassword"><BIconEye/></span>
                                <span v-else><BIconEyeSlash/></span>

                            </template>

                            <!-- <template v-if="getProgress >= 100" #message-success>
                                Secure password
                            </template> -->

                        </vs-input>

                        </div>


                        <vs-button @click="tryLogin" class="mt-3" type="gradient">Entrar</vs-button>

                        <span class="display-b mt-3">
                            ainda não possui cadastro?
                            <a class="blue-link" @click="goToSignup()">faça o cadastro</a>
                        </span>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <vs-dialog v-model="errorLogin">
            <!-- <template #header> -->
                <h4 class="p15">
                    Erro ao Entrar, Tende novamente
                </h4>
            <!-- </template> -->
        </vs-dialog>

    </div>
</template>
<script>
import Svgs from '../../assets/svgs/svgSet'
import { BIconEye, BIconEyeSlash } from 'bootstrap-vue';
import sweetAlert from 'sweetalert2';

export default {
    components:{
        BIconEye,
        BIconEyeSlash
    },

    data:() => ({
        Svgs:Svgs,

        hasVisiblePassword: false,
        errorLogin: false,

        url:process.env.VUE_APP_PROD_URL,

        email:'user1@gmail.com',
        password:'123123',
    }),

    computed: {
        getProgress() {
          let progress = 0

          // at least one number

          if (/\d/.test(this.password)) {
            progress += 20
          }

          // at least one capital letter

          if (/(.*[A-Z].*)/.test(this.password)) {
            progress += 20
          }

          // at menons a lowercase

          if (/(.*[a-z].*)/.test(this.password)) {
            progress += 20
          }

          // more than 5 digits

          if (this.password.length >= 6) {
            progress += 20
          }

          // at least one special character

          if (/[^A-Za-z0-9]/.test(this.password)) {
            progress += 20
          }

          return progress
        }
      },


    methods: {
        goToSignup(){
            this.$router.push('/Signup')
        },

        tryLogin(){
            let body ={
                email:this.email,
                password:this.password
            }
            this.$http.post(this.url + '/login', body).then(resp => {
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('id', resp.data.user_id)

                console.log(resp)
                if(resp.data != '' && resp.status == 200){
                    this.$router.push('/DashBoard')
                }else if(resp.status == 401){
                    sweetAlert.fire({
                        icon: 'error',
                        title: 'ops! algo deu errado.',
                        showConfirmButton: true
                    })
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
            // console.log(this.$http)
        }
    },
}
</script>