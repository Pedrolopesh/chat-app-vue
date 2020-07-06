<template>
  <div class="home">
    <div>
      <span class="ac icon-home" v-html="Svgs.helpDelivreyLogo"></span>

      <div class="p5">
        <h2>Seja Bem vindo!</h2>
        <p>O aplicativo ideal para ficar em casa e ter tudo</p>
      </div>

        <div class="container-buttons-home ac">
          <b-btn class="display-b"  variant="outline-primary" to="/Login">LOGIN</b-btn>
          <b-btn class="display-b mt-3"  variant="outline-primary" to="/Signup">SIGNUP</b-btn>
        </div>
    </div>
  </div>
</template>

<script>
import Svgs from '../../assets/svgs/svgSet'

export default {
  name: 'Home',
  data:() => ({
    Svgs:Svgs,
  }),
  components: {
  }
}
</script>
