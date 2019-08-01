import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
axios.default.baseURL = 'http://192.168.1.188:12'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
