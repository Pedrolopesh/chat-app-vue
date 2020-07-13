<template>
    <div>
        <componentHeader/>
        <h3>SEUS PEDIDOS</h3>

            <!-- <div class="ac container-requests">
                <BIconArrowLeft @click="backStep()" class="mr-a display-b"/>
            </div> -->

            <div class="container-list-chats ac" v-for="(item, i) in userData.request" :key='i'>
                <!-- <b-btn @click="selectRequest(item)" variant="outline-primary" class="chat-item display-b ac mt-2">
                    <div class="display-f mt-2">
                        
                        <BIconBag class="mr-2"/>
                        <span class="mr-2 display-d">{{ item.requestName }} </span>

                    </div>
                </b-btn> -->

                    <vs-button
                        color="rgb(59,222,200)"
                        class="ac mt-3 min-width-button"
                        gradient
                        size="xl"
                        @click="selectRequest(item)"
                    >
                    <BIconBag class="mr-2"/>
                        {{ item.name }}
                        <template #animate >
                            <!-- <i class='bx bx-home-alt' ></i> -->
                            <BIconBagCheck class="icon-size-25"/>
                            <h6 class="mt-2 ml-2">Detalhes do pedido</h6>
                        </template>

                    </vs-button>

            </div>

            <div>
                <vs-dialog width="550px" not-center v-model="stateDetailModal">
                    <DetailModal/>

                </vs-dialog>
                {{ stateDetailModal}}

            </div>

        <!-- MODAL DE DETALHES  -->

        <!-- MODAL DE DETALHES  -->

    </div>
</template>
<script>
import componentHeader from '@/components/cpmHeader';
import DetailModal from '@/components/cpmDetailModal';
import { mapGetters, mapActions } from 'vuex';
import { BIconBag, BIconArrowLeft, BIconX, BIconGeo, BIconBagCheck } from 'bootstrap-vue';

export default {
    data:() => ({
        items:[
            { _id:'1', requestName:'Mercado limeira'},
            { _id:'2', requestName:'Mercado Linhares'},
        ],

        url:process.env.VUE_APP_PROD_URL,
        stateDetailModal: false,
    }),

    created() {
        this.changeUserData()
        this.listRequest()
    },

    computed: {
        ...mapGetters({
            userData: 'userData'
        })
    },

    components:{
        componentHeader,
        BIconBagCheck,
        DetailModal
    },

    methods:{
        ...mapActions({
            changeUserData: 'changeUserData'
        }),

        selectRequest(param){
            // this.active = 0
            console.log(param)
            this.$store.commit("setuserRequestData", param);
            this.$store.commit("setStateDetailRequestModal", true);
            this.stateDetailModal = true;
        },

        backStep(){
            this.$router.push('/UserPreferences')
        },

        listRequest(){

            let id = localStorage.getItem('id')
            this.$http.get(this.url+`/user/${id}`).then(Response => {

                this.$store.commit("setUserData", Response.data);

                console.log(this.userData.request)

            })


        }
    }
    
}
</script>