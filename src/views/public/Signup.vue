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

                        <div class="centerx">
                            <vs-input class="ac mt-4" type="text" placeholder="Email" v-model="userForm.name"/>
                            <vs-input class="ac mt-4" type="text" placeholder="Email" v-model="userForm.name"/>
                            <vs-input class="ac mt-4" type="number" placeholder="phone" v-model="userForm.phone"/>
                            <vs-input class="ac mt-4" type="text" placeholder="password" v-model="userForm.password"/>
                        </div>

                        <vs-button to="/About" class="mt-3" type="gradient">Cadastrar</vs-button>

                        <span class="display-b mt-3">
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

export default {
    data:() => ({
        Svgs:Svgs,
        userForm:{
            name:'',
            email:'',
            phone:'',
            password:''
        }
    }),

    
    methods: {
        goToLogin(){
            this.$router.push('/Login')
        }
    },
}
</script>