<template>
  <div>
    <b-container class="p0 mb-4">
      <b-row class="ac header-container">
          <b-col class="p0"> <span class="icon-header"> <BIconList v-b-toggle.sidebar-1/> </span></b-col>
          <b-col @click="goToSetings()"><b-avatar class="ml-a display-b cp" :src='userData.imageProfile'></b-avatar>
        </b-col>
      </b-row>
    </b-container>

    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <div class="px-3 py-2">
        <p> um app ideal para o momento da crise pandemica </p>

        <vs-button gradient to="/DashBoard" type="line" class="mt-3 btn-sidebar" > <BIconHouse class="mr-1 icon-sidebar-style"/> Início</vs-button>
        <vs-button gradient type="line" class="mt-3 btn-sidebar" @click="createRequest"> <BIconPlus class="mr-1 icon-sidebar-style"/> Criar Pedido</vs-button>
        <vs-button gradient to="/RequestList" type="line" class="mt-3 btn-sidebar"> <BIconReceipt class="mr-1 icon-sidebar-style"/> Pedidos</vs-button>
        <vs-button gradient to="/ChatList" type="line" class="mt-3 btn-sidebar"> <BIconChatDotsFill class="mr-1 icon-sidebar-style"/> Conversas </vs-button>
        <vs-button gradient to="/UserPreferences" type="line" class="mt-3 btn-sidebar"> <BIconGear class="mr-1 icon-sidebar-style"/> Configurações </vs-button>
        <vs-button to="/Home" type="line" class="mt-9 btn-sidebar" danger> <BIconPower class="mr-1 icon-sidebar-style"/> Sair</vs-button>

        <!-- <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img> -->
      </div>
    </b-sidebar>

              <div>
                <CreateRequest/>
              </div>

    <!-- <b-modal id="modal-1" title="Criar Pedido">
        <modalData/>
      </b-modal> -->
  </div>
</template>

<script>
// import modalData from './cpmModalData'
import CreateRequest from './cpmCreateRequest'
import { mapGetters, mapActions } from 'vuex';
import { BIconGear, BIconList, BIconReceipt, BIconPlus, BIconHouse, BIconPower, BIconChatDotsFill } from 'bootstrap-vue'

export default {
  name: 'ComponentHeader',
  components:{

    BIconGear,
    BIconList,
    BIconReceipt,
    CreateRequest,
    BIconPlus,
    BIconHouse,
    BIconPower,
    BIconChatDotsFill,
  
  },

    computed: {

      ...mapGetters({

        userData: 'userData',

      })

    },

  methods:{
    goToSetings(){
      this.$router.push('/Profile')
    },

    createRequest(){
      this.$store.commit("setStateCreateRequestModal", true);
      // this.$modal.show('create-request-modal');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
