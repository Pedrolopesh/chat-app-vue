<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col v-b-toggle.sidebar-1>SIDE BAR</b-col>
        <b-col>ATENDA A ALGUÉM</b-col>
        <b-col v-b-modal.modal-1>CRIAR PEDIDO</b-col>
      </b-row>
    </b-container>

    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>


      <b-modal id="modal-1" title="Criar Pedido">
        <modalData/>
      </b-modal>
  </div>
</template>

<script>
import modalData from './cpmModalData'

export default {
  name: 'ComponentHeader',
  components:{
    modalData
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
