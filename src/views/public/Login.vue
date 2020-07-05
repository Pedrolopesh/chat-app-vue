<template>
    <div>
        <h1>Login</h1>


        <b-container class="bv-example-row">
            <b-row>
                <b-col>1 of 3</b-col>


                <b-col>
                    <b-card class="p5 card-style-1 mt-4">
                        <h2>Login</h2>

                        <vs-input class="ac mt-4" type="text" placeholder="Email" v-model="email"/>
                        <vs-input class="ac mt-2" type="password" placeholder="Senha" v-model="password"/>

                        <vs-button to="/DashBoard" class="mt-3" type="gradient">Entrar</vs-button>
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
    })
}
</script>