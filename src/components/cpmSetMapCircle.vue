<template>

  <div style="height: 350px;">
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
    </div>
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
      <l-circle-marker
        :lat-lng="circle.center"
        :radius="circle.radius"
        :color="circle.color"
        />
    </l-map>

<!-- <div class="display-f">

                    <vs-input
                        label-placeholder="latidute"
                        v-model="latitudePointer"
                        class="mt-4 ac display-b mw-w-40"
                        color="rgb(213, 14, 151)"
                        :danger="false"
                        :success="false"
                        icon="add"
                        icon-after="true"
                    >
                        <template #icon>
                            <i> Lat </i>
                        </template>
                    </vs-input>

                    <vs-input
                        label-placeholder="longitude"
                        v-model="longitudePointer"
                        class="mt-4 ac display-b mw-w-40"
                        color="rgb(213, 14, 151)"
                        :danger="false"
                        :success="false"
                        icon="add"
                        icon-after="true"
                    >
                        <template #icon>
                            <i> Log </i>
                        </template>
                    </vs-input>
</div> -->
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
      zoom: 13,
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

            this.setLocation(position)

        }, function(error){
            console.log(error)
        })
        }else{
            alert('ops, não foi possivel localizar sua possição')
        }
    },

    setLocation(position){
        console.log(position)
        console.log("Passou para o marcador")
        // let longitude = position.coords.longitude
        // let latitude =  position.coords.latitude

        // this.marker = L.latLng(latitude, longitude)
        // this.center = L.latLng(latitude, longitude)

        // console.log(position.coords)
        // console.log(position.coords.latitude)
        // console.log(position.coords.longitude)
    }

    // dropMarker(position){
    //     let marker = new H.map.Marker({ lat: position.Latitude, lng: position.Longitude });
    //     console.log(marker)
    // }
  },

    watch: {
        marker(){
            this.$store.commit("setCoordinateSelectedRequest", this.marker);
        }
    },
}
</script>
