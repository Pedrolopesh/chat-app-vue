<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col v-b-toggle.sidebar-1>SIDE BAR</b-col>
        <b-col>ATENDA A ALGUÉM</b-col>
        <b-col v-b-modal.modal-1>CRIAR PEDIDO</b-col>
      </b-row>
    </b-container>

    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <div class="px-3 py-2">
        <p>
          um app ideal para o momento da crise pandemica
        </p>

        <vs-button type="line" class="mt-3 btn-sidebar" icon="home">Início</vs-button>
        <vs-button type="line" class="mt-3 btn-sidebar" icon="add">Criar Pedido</vs-button>
        <vs-button to="/ChatList" type="line" class="mt-3 btn-sidebar" icon="chat">Conversas</vs-button>
        <vs-button to="/ConfigAccount" type="line" class="mt-3 btn-sidebar"> <BIconGear/>Configurações </vs-button>
        <vs-button to="/Home" type="line" class="mt-3 btn-sidebar" icon="logout">Sair</vs-button>

        <!-- <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img> -->
      </div>
    </b-sidebar>


      <b-modal id="modal-1" title="Criar Pedido">
        <modalData/>
      </b-modal>
  </div>
</template>

<script>
import modalData from './cpmModalData'
import { BIconGear } from 'bootstrap-vue'

export default {
  name: 'ComponentHeader',
  components:{
    modalData,
    BIconGear
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
