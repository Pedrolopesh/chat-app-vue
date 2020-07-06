<template>
    <div>
        <componentHeader/>
        <h3>SEUS PEDIDOS</h3>

            <div class="ac container-requests">
                <BIconArrowLeft @click="backStep()" class="mr-a display-b"/>
            </div>

            <div class="container-list-chats ac" v-for="(item, i) in items" :key='i'>
                <b-btn @click="selectRequest(item)" variant="outline-primary" class="chat-item display-b ac mt-2">
                    <div class="display-f mt-2">
                        
                        <BIconBag class="mr-2"/>
                        <span class="mr-2 display-d">{{ item.requestName }} </span>

                    </div>
                </b-btn>
            </div>


        <!-- MODAL DE DETALHES  -->
            <b-modal id="modal-scoped">
                <template v-slot:modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                    <h5>Pedido 1</h5>
                    <BIconX @click="close()" class="cp close-icon"/>
                </template>

                <template>
                    <div class="d-block text-center">

                    <p>Informações do seu pedido</p>
                    <div class="display-b mt-2">
                        <span class="mr-2">Pedro Lopes</span>
                        <b-avatar src='https://placekitten.com/300/300'></b-avatar>
                    </div>

                    <br>
                    <strong>Mercado Limeira</strong>
                    <div class="mt-3">
                        <strong>Descrição: </strong>
                        <span class="alg-txt-j">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, illo!</span>
                        <strong class="display-b mt-2">Taxa: R$ 10,00</strong>
                    </div>

                    <div class="mt-3">
                        <span>Local para compra:</span>
                        <br>
                        <iframe src=""></iframe>
                        <div class="display-f">
                            <BIconGeo class="display-b ml-a mr-2"/>
                            <strong class="display-b mr-a">Rua Lauro Linhares</strong>
                        </div>
                    </div>

                    <div class="mt-3">
                        <span>Conversas desse pedido:</span>
                        <br>

                        <b-btn variant="outline-primary" class="chat-item display-b ac mt-2">
                            <div class="display-f mt-2">
                                <span class="mr-a display-b">Fernanda Cipriano</span>
                                <b-avatar class="ml-2" src='https://placekitten.com/300/300'></b-avatar>
                            </div>
                        </b-btn>

                    </div>
                    <!-- <b-button @click="hide()">Hide Modal</b-button> -->
                    </div>
                </template>

                <template v-slot:modal-footer="{ ok}">
                    <b-button size="sm" variant="success" @click="ok()">
                        OK
                    </b-button>

                </template>
            </b-modal>
        <!-- MODAL DE DETALHES  -->

    </div>
</template>
<script>
import componentHeader from '@/components/cpmHeader';
import { BIconBag, BIconArrowLeft, BIconX, BIconGeo } from 'bootstrap-vue'

export default {
    data:() => ({
        items:[
            { _id:'1', requestName:'Mercado limeira'},
            { _id:'2', requestName:'Mercado Linhares'},
        ]
    }),

    components:{
        componentHeader
    },

    methods:{
        selectRequest(param){
            console.log(param)
            this.$bvModal.show('modal-scoped')
        },

        backStep(){
            this.$router.push('/UserPreferences')
        }
    }
    
}
</script>