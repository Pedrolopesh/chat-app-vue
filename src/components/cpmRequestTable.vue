<template>
    <div>

<!-- @click="OpenInfoModal(item)" -->
        <!-- {{ listRequest }} -->

        <b-container class="bv-example-row">

        <span class="mt-9 display-b" v-if="freeRequests == '' ">
            <h3>Não possuem pedidos registrados ainda 😪</h3>
        </span>

        <b-row class="brake-small" cols="3" v-else>
            <b-col class="brake-container" v-for="(item, i) in freeRequests" :key='i'>
                <!-- {{ item }} -->
                <b-card v-if="item" class="mt-3 mp0 alg-txt-c card-style-2" :class="[item.status == 'new' ?'border-g' : 'border-o']" @click="OpenInfoModal(item)">
                    
                    <div class="p15">

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
                    
                    </div>

                    <span :class="[item.status == 'new' ?'status-new' : 'status-interest']" class="status" v-if='item.status == "new"'>New!</span>
                    <span :class="[item.status == 'new' ?'status-new' : 'status-interest']" class="status" v-else>Vizualizada</span>
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
            freeRequests: 'freeRequests',

        }),

    },

    methods:{
        ...mapActions({
            changeRequestById: 'changeRequestById',
            changeFreeRequests: 'changeFreeRequests',
        }),

        getAllRequests(){
            this.changeFreeRequests()
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