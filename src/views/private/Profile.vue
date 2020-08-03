<template>
    <div>
        <componentHeader/>

        <div class="p10">

            <div class="ac card-style-1 p15 mw-w-25">

                <div v-if="editResources == false">
                    <b-avatar size="7rem" :src='userData.imageProfile'></b-avatar>
                    <h2 class="mt-2 display-b">{{ userData.name }}</h2>
                    <h5 class="mt-2 display-b">{{ userData.email }}</h5>
                    <h5 class="mt-2 display-b">{{ userData.phone }}</h5>
                </div>

                <div v-else class="mw-w-40 ac">
                <!-- <b-avatar size="7rem" :src='userData.imageProfile'>
                    <BIconPencil href="#upload" class="icon-size-30"/>
                </b-avatar> -->

                <b-form-file @change="updateImageProfile" size="sm"></b-form-file>
                 <vs-input class="mt-3 display-b" v-model="newUserData.name" placeholder="Name" />

                 <vs-input class="mt-3 display-b" v-model="newUserData.email" placeholder="e-mail" />
                 
                 <vs-input class="mt-3 display-b" v-model="newUserData.phone" type="number" placeholder="Telefone" />

                        <vs-button
                            @click="confirmUpdate"
                            gradient
                            success
                            class="ac mt-3 display-b"
                            size="medium"
                            animation-type="scale"
                        >
                            Confirmar
                        </vs-button>

                </div>
                       <vs-button
                            @click="editResources = !editResources"
                            gradient
                            style="min-width: 60px"
                            warn
                            class="ml-a display-b"
                            size="large"
                            animation-type="scale"
                        >
                            <BIconPencil class="icon-size-20"/>
                            <template #animate >
                                Editar
                            </template>
                        </vs-button>
            </div>

            <div class="mt-5">
                <h5 class="alg-txt-c">Raio para atendimento do seu pedido</h5>
                <div class="mw-w-25 ac">
                    <Map/>
                </div>
            </div>
        </div>

        
                        <vs-button
                            gradient
                            style="min-width: 60px"
                            danger
                            @click="logout"
                            class="ac mt-7 display-b"
                            size="large"
                            animation-type="scale"
                        >
                            <BIconPower class="icon-size-20"/>
                            <template #animate >
                                Sair
                            </template>
                        </vs-button>


    </div>
</template>
<script>
import componentHeader from  '../../components/cpmHeader'
import Map from  '../../components/cpmSetMapCircle'
import { mapGetters, mapActions } from 'vuex';
import { BIconPencil, BIconPower } from 'bootstrap-vue';
import sweetAlert from 'sweetalert2';

export default {
    components:{
        componentHeader,
        BIconPencil,
        BIconPower,
        Map
    },

    data:() =>({
        editResources: false,

        selectedFile:'',

        newUserData:{},

        url:process.env.VUE_APP_PROD_URL,

    }),

    computed: {

        ...mapGetters({
            userData: 'userData',
        }),

    },

    methods: {
        ...mapActions({
            changeUserData: 'changeUserData',
        }),

        logout(){
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            this.$router.push('/Home')
        },

        updateImageProfile(event){
            let selectedFile = event.target.files[0]

            const fd = new FormData();
            fd.append('photo', selectedFile)
            fd.append('user_id', this.userData._id)

            this.$http.put(this.url + '/update/user/image', fd )
            .then(response => {
                console.log(response)
            })
        },

        confirmUpdate(){
            let body = {

                user_id: this.userData._id,
                name: this.newUserData.name,
                email: this.newUserData.email,
                phone: this.newUserData.phone,

            }

            this.$http.put(this.url + '/update/user', body )

            .then(response => {

                console.log(response)

                if(response.data.success == true){
                    
                    this.changeUserData()
                    this.editResources = false

                    sweetAlert.fire({
                        icon: 'success',
                        title: 'Usuário alterado com sucesso',
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
        }
    },
}
</script>