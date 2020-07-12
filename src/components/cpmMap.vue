<template>

  <div style="height: 350px;">
    <div class="info" style="height: 10%">
      <!-- <span>Center: {{ center }}</span> -->
      <!-- <span>Zoom: {{ zoom }}</span> -->
      <!-- <span>Bounds: {{ bounds }}</span> -->
      <!-- {{ userRequestData.longitude }} -->
      <!-- {{ userRequestData.latitude }} -->
      <!-- {{ marker }} -->
    </div>
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="parseMarker()"
      @change="parseMarker"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="parseMarker()"></l-marker>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import {
  mapGetters, mapActions
} from 'vuex';


export default {
  name:'ComponentMap',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
    //   url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=49778a018458470496d038cb8e74e5d8',
      zoom: 16,
      attribution:'&copy; <a href=http://osm.org/copyright>OpenStreetMap</a>contributors',
      center: L.latLng(47.413220, -1.219482),
      bounds: null,
      marker: ''
    };
  },
  created() {
      this.parseMarker()
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
    // centerUpdated (center) {
    //   this.center = center;
    // },
    // boundsUpdated (bounds) {
    //   this.bounds = bounds;
    // }

    parseMarker(){
        
        let longitude = this.userRequestData.longitude
        let latitude =  this.userRequestData.latitude
        return L.latLng(latitude, longitude)
    }
  },

    // watch: {
    //     bounds(){
    //         console.log(this.bounds)
    //     }
    // },
}
</script>
