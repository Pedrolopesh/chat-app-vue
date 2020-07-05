<template>
  <div>
    <h1>This is an about page</h1>

    <b-card class="ac tutorial-card">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        :interval="100000"
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide
          caption="First slide"
          text="Texto de como vai funcionar o aplicativo"
          img-src="https://picsum.photos/1024/480/?image=10"
        ></b-carousel-slide>

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
      </b-carousel>
    </b-card>
  </div>
</template>
