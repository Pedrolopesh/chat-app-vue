<template>
    <div>
            <vs-dialog width="550px" not-center v-model="stateDetailModal">
                <h1>teste</h1>

                <h3>Pedido {{ userRequestData.name }}</h3>
                
                <div>
                    <span>{{ userData.name }}</span>
                    <b-avatar class="ml-2" :src='userData.imageProfile'></b-avatar>
                </div>

                <div>
                    <BIconCart3 class="mr-1"/>
                    <span>{{ userRequestData.placeName }}</span>
                </div>

                <div>
                    <BIconGeo class="mr-1"/>
                    <span>{{ userRequestData.address }}</span>
                </div>

                <div>
                    Descrição:
                    <span>{{ userRequestData.description }}</span>
                </div>

                <div>
                    Taxa para entrega:
                    <strong>R$ {{ userRequestData.fee }}</strong>
                </div>


                <div>
                    <DetailMap/>
                </div>
                
                <vs-button size="large" @click="iniciateChat(userRequestData)" class="mt-4 ac" color="rgb(59,222,200)" type="gradient">
                    Iniciar Chat
                    <BIconChat class="ml-2 icon-size-20"/>
                </vs-button>

            </vs-dialog>

    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { BIconCart3, BIconGeo, BIconChat } from 'bootstrap-vue';
import DetailMap from './cpmMap'

export default {

    components:{
        BIconCart3,
        BIconGeo,
        DetailMap,
        BIconChat
    },

    data:() => ({
        stateDetailModal: false
    }),

    computed: {

        ...mapGetters({
            userData: 'userData',
            userRequestData: 'userRequestData',
            detailRequestModalState: 'detailRequestModalState',
        })

    },

        watch: {

        // CONTROL LOCAL VARIABLE MODAL STATE
        stateDetailModal(){

            if(this.stateDetailModal == false){

                this.$store.commit("setStateDetailRequestModal", false);

            }

            else if(this.stateDetailModal == true){

                this.$store.commit("setStateDetailRequestModal", true);

            }

        },

        // CONTROL GLOBAL VARIABLE MODAL STATE
        detailRequestModalState(){

            if(this.detailRequestModalState == false){

                this.stateDetailModal = false

            }else {

                this.stateDetailModal = true

            }

        },
    },
}
</script>