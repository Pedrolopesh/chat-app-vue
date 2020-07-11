<template>
    <div>
        <b-button @click="stateModal = true">Open Modal</b-button>
                        {{ createModalState }}

        <vs-dialog width="550px" not-center v-model="stateModal">
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
                        icon-after="true"
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
                        icon="shopping_cart"
                        icon-after="true"
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
                        icon="email" 
                        icon-after="true"
                    >
                        <template #icon>
                            <i><BIconMap/></i>
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
                        icon="add"
                        icon-after="true"
                    >
                        <template #icon>
                            <i> $ </i>
                        </template>
                    </vs-input>


                    <div>
                        <setMapPoints/>
                    </div>


                    <vs-button
                        color="rgb(59,222,200)"
                        gradient
                        class="ac mt-5"
                        :active="active == 6"
                        @click="active = 6"
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
import { BIconBox, BIconMap, BIconBasket } from 'bootstrap-vue';
import setMapPoints from './cpmSetMapPoints'

export default {
    components:{
        BIconBox,
        BIconMap,
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
        })
    },

    methods: {
        
        show () {
            this.$modal.show('create-request-modal');
        },

        hide () {
            this.$modal.hide('create-request-modal');
        },

        createRequest(){
            let loged_user = localStorage.getItem('id')

            let body = {
                name: this.requestForm,
                placeName: this.requestForm,
                address: this.requestForm,
                description: this.requestForm,
                fee: this.requestForm,
                latitude: this.requestForm,
                longitude: this.requestForm,
                status: this.requestForm,
                user: loged_user
            }
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