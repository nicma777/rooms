import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router'

import SingleControllerInfo from '@/components/SingleControllerInfo'
import Home from '@/components/Home'

Vue.use(VueRouter)


const routes = [
  { path: '/info/:zone', 
    name: 'SingleControllerInfo',
    component: SingleControllerInfo },
  { path: '/',
    name: 'Home',
    component: Home}
]
const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
