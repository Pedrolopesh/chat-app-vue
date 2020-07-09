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
                        <vs-input class="ac mt-4" type="password" placeholder="Senha" v-model="password"/>

                        <vs-button @click="tryLogin" class="mt-3" type="gradient">Entrar</vs-button>

                        <span class="display-b mt-3">
                            ainda não possui cadastro?
                            <a class="blue-link" @click="goToSignup()">faça o cadastro</a>
                        </span>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import Svgs from '../../assets/svgs/svgSet'

export default {
    data:() => ({
        Svgs:Svgs,

        url:process.env.VUE_APP_PROD_URL,

        email:'',
        password:'',
    }),

    methods: {
        goToSignup(){
            this.$router.push('/Signup')
        },

        tryLogin(){
            let body ={
                email:this.email,
                password:this.password
            }
            this.$http.post(this.url + '/login', body).then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('id', response.data.user_id)

                console.log(response)
                if(response.data != '' && response.status == 200){
                    this.$router.push('/DashBoard')
                }else{
                    alert("error")
                }
            })
            .catch(err => {
                console.log(err)
                alert("error")
            })
            // console.log(this.$http)
        }
    },
}
</script>