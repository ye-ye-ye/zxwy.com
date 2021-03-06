import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import base from './router/base.js'
 import test from './router/test.js'
Vue.use(Router)

export default new Router({
 
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
		 {
		   path: '/Home',
		   name: 'home',
		   component: Home,
		 	children:[...base,...test] 
		 }
  ]
})
