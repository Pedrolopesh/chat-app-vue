<template>
    <div>

        <b-container class="bv-example-row mt-7">
            <b-row class="brake-small">

                <b-col>
                    <!-- <img :src='"./card-login.png"' > -->
                </b-col>


                <b-col>
                    <b-card class="p5 card-style-1 mt-4">
                        <h2>Login</h2>

                        <vs-input class="ac mt-4" type="text" placeholder="Email" v-model="email"/>
                        <vs-input class="ac mt-2" type="password" placeholder="Senha" v-model="password"/>

                        <vs-button to="/DashBoard" class="mt-3" type="gradient">Entrar</vs-button>

                        <span class="display-b mt-3">
                            ainda não possui cadastro?
                            <a @click="goToSignup()">faça o cadastro</a>
                        </span>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    data:() => ({
        email:'',
        password:'',
    }),

    methods: {
        goToSignup(){
            this.$router.push('/Signup')
        }
    },
}
</script>