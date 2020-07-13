<template>
    <div>
        <!-- <b-button @click="stateModal = true">Open Modal</b-button> -->
                        <!-- {{ createModalState }} -->

        <vs-dialog width="550px" not-center blur v-model="stateModal">
        <template #header>
          <h4 class="not-margin">
            Registre seu pedido
          </h4>
        </template>


        <div class="con-content">
        
                    <vs-input
                        label-placeholder="Nome do pedido"
                        v-model="requestForm.name"
                        class="mt-4 ac display-b mw-w-40"
                        color="rgb(213, 14, 151)"
                        :icon-after="true"
                    >
                        <template #icon>
                            <i><BIconBox/></i>
                        </template>
                    </vs-input>

                    <vs-input
                        label-placeholder="Nome do lugar"
                        class="mt-4 ac display-b mw-w-40"
                        v-model="requestForm.placeName"
                        color="rgb(213, 14, 151)"
                        :danger="false"
                        :success="false"
                        :icon-after="true"
                    >
                        <template #icon>
                            <i><BIconBasket/></i>
                        </template>
                    </vs-input>
                    
                    <vs-input
                        label-placeholder="endereço" 
                        class="mt-4 ac display-b mw-w-40"
                        v-model="requestForm.address"  
                        color="rgb(213, 14, 151)" 
                        :danger="false" 
                        :success="false"
                        :icon-after="true"
                    >
                        <template #icon>
                            <i><BIconGeo/></i>
                        </template>
                    </vs-input>

                     <textarea 
                        placeholder="Descrição"
                        class="global-textarea mt-3"
                        color="rgb(213, 14, 151)"
                        v-model="requestForm.description" 
                        width="100px"
                    />

                    <vs-input
                        label-placeholder="Taxa para o entregador"
                        v-model="requestForm.fee"
                        class="mt-4 ac display-b mw-w-40"
                        color="rgb(213, 14, 151)"
                        :danger="false"
                        :success="false"
                        type="number"
                        :icon-after="true"
                    >
                        <template #icon>
                            <i> $ </i>
                        </template>
                    </vs-input>


                    <div class="mt-5">
                        <small>*Aponte no mapa a região que estão localizada o local para a compra.</small>
                        <setMapPoints/>
                    </div>

                    <!-- {{ coordinateSelectedRequest }} -->
                    <vs-button
                        color="rgb(59,222,200)"
                        gradient
                        class="ac mt-5"
                        :active="active == 6"
                        @click="createRequest"
                    >
                        ENVIAR
                    </vs-button>

        </div>
    
    <!-- <template #footer>
          <div class="con-footer">
            <vs-button @click="active=false" transparent>
              Ok
            </vs-button>
          </div>
        </template> -->
    
      </vs-dialog>


    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { BIconBox, BIconGeo, BIconBasket } from 'bootstrap-vue';
import setMapPoints from './cpmSetMapPoints'

export default {
    components:{
        BIconBox,
        BIconGeo,
        BIconBasket,
        setMapPoints
    },

    data:() => ({
        requestForm:{
            name:'',
            placeName:'',
            address:'',
            description:'',
            fee:''
        },

        active:'',

        stateModal:false,

        modalState: false,

    }),

    computed: {
        ...mapGetters({
            createModalState: 'createModalState',
            coordinateSelectedRequest: 'coordinateSelectedRequest',
        })
    },

    methods: {

        ...mapActions({
            createNewRequestApp: 'createNewRequestApp',
            changeListRequest: 'changeListRequest',
        }),
        
        show () {
            this.$modal.show('create-request-modal');
        },

        hide () {
            this.$modal.hide('create-request-modal');
        },

        createRequest(){
            this.active = 6
            let loged_user = localStorage.getItem('id')

            let body = {
                name: this.requestForm.name,
                placeName: this.requestForm.placeName,
                address: this.requestForm.address,
                description: this.requestForm.description,
                fee: this.requestForm.fee,
                latitude: this.coordinateSelectedRequest.lat,
                longitude: this.coordinateSelectedRequest.lng,
                status: 'new',
                user: loged_user
            }
            // console.log(body)
            this.createNewRequestApp(body)
            this.stateModal = false
            this.changeListRequest()
            // console.log(this.coordinateSelectedRequest.lng)
        }
    },

    watch: {
        // CONTROL LOCAL VARIABLE MODAL STATE
        createModalState(){
            if(this.createModalState == false){
                this.stateModal = false

            }else {
                this.stateModal = true
            }
        },

        // CONTROL GLOBAL VARIABLE MODAL STATE
        stateModal(){
            if(this.stateModal == false){
                this.$store.commit("setStateCreateRequestModal", false);
                
            }else{
                this.$store.commit("setStateCreateRequestModal", true);
                
            }
        }
    },
}
</script>