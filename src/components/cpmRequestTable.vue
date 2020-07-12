<template>
    <div>

<!-- @click="OpenInfoModal(item)" -->
        <!-- {{ listRequest }} -->


        <b-container class="bv-example-row">
        <b-row class="brake-small" cols="3">
            <b-col class="brake-container" v-for="(item, i) in listRequest" :key='i'>
                <b-card v-if="item" class="mt-3 alg-txt-c card-style-2" @click="OpenInfoModal(item)">
                    
                    <div class="display-f">
                        <strong class="ac">Pedido {{ i+1 }} </strong>
                        <BIconTrash class="clr-red display-b alg-txt-e"/>
                    </div>
                    <br>

                    <div class="display-b mt-2">
                        <span class="mr-2">{{ item.user[0].name }} </span>
                        <b-avatar :src='item.user[0].imageProfile'></b-avatar>
                    </div>

                    <div class="alg-txt-c mt-3">
                        <span class="mt-2 display-b"><strong>{{ item.name }}</strong> </span>
                        <span class="mt-2 display-b"><strong>{{ item.placeName }}</strong> </span>
                        <span class="mt-2 display-b"><strong>{{ item.address }}</strong> </span>
                        <span class="mt-2 display-b"><strong>R$ {{ item.fee }}</strong> </span>
                    </div>

                </b-card>
            </b-col>
        </b-row>
        </b-container>

        <b-modal ref="userRequest-modal" hide-footer title="Informações do pedido">
            <div class="d-block text-center">
                    <!-- {{ requestSelectedId }} -->
               <div v-if="userRequestData">
                    <h5>pedido {{ userRequestData.name }}</h5>

                    <div class="display-b mt-5">
                        <span class="mr-2">{{ userRequestData.user[0].name }} </span>
                        <b-avatar :src='userRequestData.user[0].imageProfile'></b-avatar>
                    </div>

                    <div class="mt-4">
                        <BIconCart/>
                        <strong class="ml-2">{{ userRequestData.placeName }}</strong>
                    </div>
                    
                    <!-- <strong>{{ requestSelectedId }}</strong> -->
                    <br>
    
                    <div class="mt-3">
                        <strong>Descrição: </strong>
                        <span class="alg-txt-j">{{ userRequestData.description }}</span>
                    </div>

                    <div class="mt-3">
                        <span>Local para compra:</span>
                        <!-- <iframe src=""></iframe> -->
                        <Map/>
                    <div>
                        <BIconGeo/>
                        <strong class="ml-2">{{ userRequestData.address }}</strong>
                    </div>

                        <strong class="display-b mt-2">{{ userRequestData.adrres }}</strong>
                    </div>
                    

                    <vs-button @click="iniciateChat(userRequestData)" class="mt-4 ac" color="rgb(59,222,200)" type="gradient">
                        Iniciar Chat
                        <BIconChat class="ml-2 icon-size-20"/>
                    </vs-button>
                </div>
            </div>
        </b-modal>

        <vs-dialog blur v-model="alertModal">
        
            <h1>alerta</h1>
            <p>Este pedido foi criado por você</p>

        </vs-dialog>

    </div>
</template>
<script>
import { BIconTrash, BIconChat, BIconCart } from 'bootstrap-vue'
import svgs from '../assets/svgs/svgSet';
import Map from '@/components/cpmMap'
import { mapGetters, mapActions } from 'vuex';

export default {
    data:() => ({

        alertModal: false,

        url:process.env.VUE_APP_PROD_URL,

        svgs:svgs,
        items:[
            {numRequest:'1', userName:'Pedro lopes', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00', description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facilis fugit sunt ratione nemo voluptates ipsa minus quibusdam repudiandae suscipit!'},
            {numRequest:'2', userName:'Fernanda', userPicture:'https://picsum.photos/500/500/?image=54', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00', description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facilis fugit sunt ratione nemo voluptates ipsa minus quibusdam repudiandae suscipit!'},
            {numRequest:'3', userName:'Gaia Beat', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00', description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facilis fugit sunt ratione nemo voluptates ipsa minus quibusdam repudiandae suscipit!' },
            {numRequest:'4', userName:'Greatchen', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00', description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facilis fugit sunt ratione nemo voluptates ipsa minus quibusdam repudiandae suscipit!' },
            {numRequest:'5', userName:'Xuxa', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00', description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facilis fugit sunt ratione nemo voluptates ipsa minus quibusdam repudiandae suscipit!' },
            {numRequest:'6', userName:'Limeira', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00', description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facilis fugit sunt ratione nemo voluptates ipsa minus quibusdam repudiandae suscipit!' },
        ]
    }),

    components:{
        BIconTrash,
        BIconCart,
        Map,
    },

    created() {
        this.getAllRequests()
        // this.changeListRequest()
    },

    computed: {

        ...mapGetters({
            userRequestData: 'userRequestData',
            listRequest: 'listRequest',
            requestSelectedId: 'requestSelectedId',
        }),

    },

    methods:{
        ...mapActions({
            // changeUserRequestData: 'changeUserRequestData',
            changeListRequest: 'changeListRequest',
            changeRequestById: 'changeRequestById',
        }),

        getAllRequests(){
            // this.$http.get(this.url + '/list/request').then(response => {
                // })
            this.changeListRequest()
        
        },

        OpenInfoModal(param){
            // this.changeRequestById(param._id)
            // this.changeUserRequestData(param)

            this.$store.commit("setuserRequestData", param);

            console.log(param)
            this.showModal()
        },

        iniciateChat(param){
            console.log("ID DO PEDIDO")
            console.log(param._id)
            
            console.log("ID DO USUÀRIO QUE CRIOU O PEDIDO")
            console.log(param.user[0]._id)

            let id = localStorage.getItem('id')
            console.log("ID DO USUÀRIO QUE ESTÀ LOGADO")
            console.log(id)

            if(id == param.user[0]._id){
                console.log("IDs são iguais")
                this.alertModal = true
            }
        },

        showModal() {
            this.$refs['userRequest-modal'].show()
        },
        hideModal() {
            this.$refs['userRequest-modal'].hide()
        },
    }
}
</script>