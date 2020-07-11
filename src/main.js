import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'
import axios from './util/axios'
import store from './store'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuesax from 'vuesax'
import vmodal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2';

import 'leaflet/dist/leaflet.css';
import './assets/index.scss'
import './registerServiceWorker'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)
Vue.use(vmodal, { dynamicDefault: { draggable: true, resizable: true } })

Vue.prototype.$http = axios
Vue.prototype.$url = process.env.VUE_APP_PROD_URL

Vue.config.productionTip = false
Vue.use(Vuesax, {
  // options here
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

export { axios }