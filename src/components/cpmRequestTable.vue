<template>
    <div>

<!-- @click="OpenInfoModal(item)" -->
        <!-- {{ listRequest }} -->

        <b-container class="bv-example-row">

        <span class="mt-9 display-b" v-if="listRequestByStatus == '' ">
            <h3>Não possuiem pedidos ainda 😪</h3>
        </span>

        <b-row class="brake-small" cols="3" v-else>
            <b-col class="brake-container" v-for="(item, i) in listRequestByStatus" :key='i'>
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

        <vs-dialog width="550px" not-center blur v-model="stateDetailModal">
            <DetailModal/>
        </vs-dialog>



    </div>
</template>
<script>
import { BIconTrash, BIconChat, BIconCart } from 'bootstrap-vue'
import svgs from '../assets/svgs/svgSet';
import Map from '@/components/cpmMap';
import DetailModal from '@/components/cpmDetailModal';
import { mapGetters, mapActions } from 'vuex';

export default {
    data:() => ({

        alertModal: false,
        stateDetailModal: false,

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
        DetailModal,
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
            listRequestByStatus: 'listRequestByStatus',

        }),

    },

    methods:{
        ...mapActions({
            changeListRequestByStatus: 'changeListRequestByStatus',
            changeListRequest: 'changeListRequest',
            changeRequestById: 'changeRequestById',
        }),

        getAllRequests(){
            // this.$http.get(this.url + '/list/request').then(response => {
                // })
            this.changeListRequest()
            this.changeListRequestByStatus('new')

        },

        OpenInfoModal(param){
            // this.changeRequestById(param._id)
            // this.changeUserRequestData(param)

            this.$store.commit("setuserRequestData", param);
            this.stateDetailModal = true
            // console.log(param)
            // this.showModal()
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