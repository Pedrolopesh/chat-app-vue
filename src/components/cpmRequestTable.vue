<template>
    <div>
        <b-container class="bv-example-row">
        <b-row class="brake-small" cols="3">
            <b-col v-for="(item, i) in items" :key='i'>
                <b-card class="mt-3 alg-txt-c card-style-2" @click="OpenInfoModal(item)">
                    
                    <div class="display-f">
                        <strong class="ac">Pedido {{ item.numRequest }} </strong>
                        <BIconTrash class="clr-red display-b alg-txt-e"/>
                    </div>
                    <br>

                    <div class="display-b mt-2">
                        <span class="mr-2">{{ item.userName }} </span>
                        <b-avatar :src='item.userPicture'></b-avatar>
                    </div>

                    <div class="alg-txt-s mt-3">
                        <span class="mt-2 display-b">Nome do lugar: <strong>{{ item.placeName }}</strong> </span>
                        <span class="mt-2 display-b">Endereço: <strong>{{ item.adrres }}</strong> </span>
                        <span class="mt-2 display-b">taxa para entregar: <strong>R$ {{ item.fee }}</strong> </span>
                    </div>

                </b-card>
            </b-col>
        </b-row>
        </b-container>

        <b-modal ref="userRequest-modal" hide-footer title="Informações do pedido">
            <div class="d-block text-center">

                <div>
                    <h5>pedido {{ userRequestData.numRequest }}</h5>

                    <div class="display-b mt-2">
                        <span class="mr-2">{{ userRequestData.userName }} </span>
                        <b-avatar :src='userRequestData.userPicture'></b-avatar>
                    </div>

                    <strong>{{ userRequestData.placeName }}</strong>
                    <br>
    
                    <div class="mt-3">
                        <strong>Descrição: </strong>
                        <span class="alg-txt-j">{{ userRequestData.description }}</span>
                    </div>

                    <div class="mt-3">
                        <span>Local para compra:</span>
                        <br>
                        <iframe src=""></iframe>
                        <strong class="display-b mt-2">{{ userRequestData.adrres }}</strong>
                    </div>

                    <vs-button @click="iniciateChat(userRequestData)" class="mt-4" color="primary" type="gradient">
                        Iniciar Chat
                        <BIconChat/>
                    </vs-button>
                </div>
            </div>

        </b-modal>


    </div>
</template>
<script>
import { BIconTrash, BIconChat } from 'bootstrap-vue'
import svgs from '../assets/svgs/svgSet'
import {
  mapGetters, mapActions
} from 'vuex';

export default {
    data:() => ({
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
        BIconTrash
    },

    computed: {

        ...mapGetters({
            userRequestData: 'userRequestData',
        }),

    },

    methods:{
        ...mapActions({
            changeUserRequestData: 'changeUserRequestData'
        }),

        OpenInfoModal(param){
            this.changeUserRequestData(param)
            this.showModal()
        },

        iniciateChat(param){
            console.log(param)
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