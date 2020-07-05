<template>
    <div>
        <vs-input class="ac mt-4" label-placeholder="Nome do Local" v-model="requestData.placeName"/>

        <vs-textarea class="ac mt-3 description-area" placeholder="Descrição do pedido" v-model="requestData.description"/>


        <vs-input class="ac mt-4" label-placeholder="Taxa do pedido" type="number" v-model="requestData.fee"/>

        <div class="map alg-txt-c mt-5">
            aqui vai um mapa
        </div>
        <vs-input class="ac mt-4" label-placeholder="Endereço" v-model="requestData.address"/>


        <vs-button class="ac display-b mt-2" color="primary" type="border">Criar pedido</vs-button>

    </div>
</template>
<script>
export default {
    data:() => ({
        requestData:{
            placeName:'',
            description:'',
            address:'',
            fee:'',
        }
    })
}
</script>