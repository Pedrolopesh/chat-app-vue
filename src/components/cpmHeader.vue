<template>
  <div>
    <b-container class="p0 mb-4">
      <b-row class="ac header-container">
        <b-col class="p0"> <span class="icon-header"> <BIconList v-b-toggle.sidebar-1/> </span></b-col>
        <b-col></b-col>
        <b-col @click="goToSetings()"><b-avatar class="ml-a display-b" src='https://picsum.photos/500/500/?image=54'></b-avatar>
        </b-col>
      </b-row>
    </b-container>

    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <div class="px-3 py-2">
        <p> um app ideal para o momento da crise pandemica </p>

        <vs-button to="/DashBoard" type="line" class="mt-3 btn-sidebar" icon="home">Início</vs-button>
        <vs-button type="line" class="mt-3 btn-sidebar" icon="add">Criar Pedido</vs-button>
        <vs-button to="/ChatList" type="line" class="mt-3 btn-sidebar"> <BIconReceipt class="mr-1"/> Pedidos</vs-button>
        <vs-button to="/UserPreferences" type="line" class="mt-3 btn-sidebar"> <BIconGear class="mr-1"/> Configurações </vs-button>
        <vs-button to="/Home" type="line" class="mt-3 btn-sidebar" icon="logout">Sair</vs-button>

        <!-- <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img> -->
      </div>
    </b-sidebar>

<!-- <b-modal id="modal-1" title="Criar Pedido">
        <modalData/>
      </b-modal> -->
  </div>
</template>

<script>
import modalData from './cpmModalData'
import { BIconGear, BIconList, BIconReceipt } from 'bootstrap-vue'

export default {
  name: 'ComponentHeader',
  components:{
    modalData,
    BIconGear,
    BIconList,
    BIconReceipt
  },

  methods:{
    goToSetings(){
      this.$router.push('/UserPreferences')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
