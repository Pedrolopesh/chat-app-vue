<template>
    <div>
        <h1>Signup</h1>

        <b-container class="bv-example-row">
            <b-row>
                <b-col>1 of 3</b-col>


                <b-col>
                    <b-card class="p5 card-style-1 mt-4">
                        <h2>Cadastro</h2>

                        <div class="centerx">
                            <vs-input class="ac mt-4" type="text" placeholder="Email" v-model="userForm.name"/>
                            <vs-input class="ac mt-4" type="text" placeholder="Email" v-model="userForm.email"/>
                            <vs-input class="ac mt-4" type="text" placeholder="password" v-model="userForm.password"/>
                        </div>

                        <vs-button to="/About" class="mt-3" type="gradient">Cadastrar</vs-button>

                        <span class="display-b mt-3">
                            já possui cadastro?
                            <a @click="goToLogin()">faça o login</a>
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
        userForm:{
            name:'',
            email:'',
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