<template>
  <div>
    <div class="ac tutorial-card">
      <!-- <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          fade
          :interval="100000"
          indicators
          img-width="1024"
          img-height="480"
        >

        <b-carousel-slide
          caption="Second Slide"
          text="Texto de como vai funcionar o aplicativo"
          img-src="https://picsum.photos/1024/480/?image=12"
        ></b-carousel-slide>
        
        <b-carousel-slide
          caption="Third Slide"
          text="Texto de como vai funcionar o aplicativo"
          img-src="https://picsum.photos/1024/480/?image=22"
        >
          <vs-button to="/DashBoard" color="primary" type="filled">Entrar na diversão</vs-button>
        </b-carousel-slide>
      </b-carousel> -->

    <main>
        <agile :nav-buttons="true" class="carousel">
            <div class="slide card-carousel">
                <!-- <h3>slide 1</h3> -->
                <img class="icon-step-1" :src="'./cardStep1.png'"/>
                <h3>Crie seu pedido descrevendo todas as informações para quem vai atender seu pedido.</h3>
            </div>
            
            
            <div class="slide card-carousel">
                <!-- <h3>slide 2</h3> -->
                <img class="icon-step-2" :src="'./cardStep2.png'"/>
                <h3>Converse com a pessoa que deseja realizar seu pedido e combine todos os detalhes.</h3>
            </div>

            <div class="slide card-carousel">
                <!-- <h3>slide 3</h3> -->
                <img class="icon-step-3" :src="'./cardStep3.png'"/>
                <h3>Após tudo combinado, você receberá sua encomenda em casa. <br> Entre na diversão 😁</h3>

                <vs-button
                  gradient
                  class="ac mt-4 mb-3"
                  size="large"
                  @click="skipToDashBoard"
                >
                  Entrar
                </vs-button>
            </div>

        </agile>
    </main>

        <h4 class="display-b mt-3 ac cp skip-link" @click="skipToDashBoard">skip</h4>
      
    
    </div>
  </div>
</template>
<script>
import svgs from '../../assets/svgs/svgSet'

export default {
  data:() => ({
    svgs:svgs

  }),

  methods:{
    skipToDashBoard(){
      this.$router.push('/DashBoard')
    }
  },

  components:{

  }
}
</script>