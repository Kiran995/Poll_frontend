import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)

axios.defaults.baseURL = 'http://localhost:8000/web-api/v1'
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let token = localStorage.getItem('user-token')
const instance = axios.create()
instance.defaults.headers.common['Authorization'] = `JWT ${token}`;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
