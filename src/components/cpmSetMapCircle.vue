<template>

  <div style="height: 350px;">
            <div class="display-f">

            <vs-button
                gradient
                warn
                :active="active == 1"
                @click="set100m"
            >
                100m
            </vs-button>

            <vs-button
                gradient
                warn
                :active="active == 2"
                @click="set300m"
            >
                300m
        </vs-button>

            <vs-button
                gradient
                warn
                :active="active == 3"
                @click="set500m"
            >
                500m
        </vs-button>

            <vs-button
                gradient
                warn
                :active="active == 4"
                @click="set700m"
            >
                700m
        </vs-button>

      </div>
    <div class="info" style="height: 10%">
      <!-- <span>Center: {{ center }}</span> -->
      <!-- <span>Zoom: {{ zoom }}</span> -->
      <!-- <span>Bounds: {{ bounds }}</span> -->
      <!-- {{ userRequestData.longitude }} -->
      <!-- {{ userRequestData.latitude }} -->
      <!-- {{ marker }} -->
      <!-- {{ center }}
      <button @click="setMarker">
          tyr
      </button> -->

    <!-- {{ latitudePointer }} -->
    <!-- {{ longitudePointer }} -->
    </div>
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
      <l-circle-marker
        :lat-lng="circle.center"
        :radius="circle.radius"
        :color="circle.color"
        />
    </l-map>

  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LCircleMarker} from 'vue2-leaflet';
import {
  mapGetters, mapActions
} from 'vuex';


export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircleMarker
  },
  data () {
    return {
    //   url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=49778a018458470496d038cb8e74e5d8',
      zoom: 15,
      attribution:'&copy; <a href=http://osm.org/copyright>OpenStreetMap</a>contributors',
      center: L.latLng(47.413220, -1.219482),
      bounds: null,
      marker: L.latLng(47.413220, -1.219482),
      latitudePointer:'',
      longitudePointer:'',
      circle: {
        center: [47.413220, -1.219482],
        radius: 100,
        color: 'yellow'
      },
      active:''
    };
  },
  created() {
      this.setMarker()
  },
      computed: {

        ...mapGetters({
            userRequestData: 'userRequestData',
        }),

    },
  methods: {
    // zoomUpdated (zoom) {
    //   this.zoom = zoom;
    // },
    centerUpdated (center) {
      this.center = center;
      this.marker = center
    },
    // boundsUpdated (bounds) {
    //   this.bounds = bounds;
    // }

    parseMarker(){
        
        let longitude = this.userRequestData.longitude
        let latitude =  this.userRequestData.latitude
        return L.latLng(latitude, longitude)

    },

    setMarker(){
        if('geolocation' in navigator){

        navigator.geolocation.getCurrentPosition(function(position){

            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            console.log("Localização atual")

        }, function(error){
            console.log(error)
        })
        }else{
            alert('ops, não foi possivel localizar sua possição')
        }
    },

    setLocation(){
        console.log(this.currentCordinations)
        // let longitude = this.longitudePointer
        // let latitude =  this.latitudePointer
        // console.log(latitude)

        // this.marker = L.latLng(longitude, latitude)
        // this.center = L.latLng(longitude, latitude)
        // this.circle.center = L.latLng(longitude, latitude)

        // console.log(position.coords.latitude)
        // console.log(position.coords.longitude)
    },

    set100m(){
        this.active = 1
        this.zoom = 20
    },

    set300m(){
        this.active = 2
        this.zoom = 17

    },
    
    set500m(){
        this.active = 3
        this.zoom = 15

    },

    set700m(){
        this.active = 4
        this.zoom = 13

    }
  },

    watch: {
        marker(){
            this.$store.commit("setCoordinateSelectedRequest", this.marker);
        }
    },
}
</script>
