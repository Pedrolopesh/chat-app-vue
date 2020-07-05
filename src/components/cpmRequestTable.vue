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


    </div>
</template>
<script>
import { BIconTrash } from 'bootstrap-vue'

export default {
    data:() => ({
        items:[
            {numRequest:'1', userName:'Pedro lopes', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00' },
            {numRequest:'2', userName:'Fernanda', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00' },
            {numRequest:'3', userName:'Gaia Beat', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00' },
            {numRequest:'4', userName:'Greatchen', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00' },
            {numRequest:'5', userName:'Xuxa', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00' },
            {numRequest:'6', userName:'Limeira', userPicture:'https://placekitten.com/300/300', placeName:'Mercado Limeira', adrres:'Rua Lauro Linhares', fee:'5,00' },
        ]
    }),

    components:{
        BIconTrash
    },

    methods:{
        OpenInfoModal(param){
            console.log(param)
        }
    }
}
</script>