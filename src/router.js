import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  history: true,
  routes: [{
    path: '/',
    name: 'Welcome',
    component: Welcome
  }]
})
