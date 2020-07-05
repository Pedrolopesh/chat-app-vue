import Vue from 'vue'
import App from './App.vue'
import axios from './util/axios'
import store from './store'
import router from './router'

import './assets/index.scss'
import './registerServiceWorker'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuesax from 'vuesax'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

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