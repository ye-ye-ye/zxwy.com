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
// 设置默认请求地址
axios.defaults.baseURL = 'http://192.168.1.188:12'

var token=JSON.parent(sessionStorage.getItem("token_type"))
//设置默认请求头
axios.defaults.headers.Authorization=token
 
  //注册导航守卫(回调函数)，beforeEach全局前置守卫
router.beforeEach((to,from,next)=>{
  //next 方法不执行就不会跳转，类似于中间件的作用
  next();
  if(to.path === '/') {
    //登录页不需要进行判断
    next();
  }else{
      let token = window.sessionStorage.getItem("token_type");
    //判断token是否存在，有没有登录
    if(token){
      //token存在，登录成功
      //继续访问
      next();
    }else{
      //没有token，没有登录
      //this.$message.error("请先登录");提示框不生效
      //本来其他组件Vue实例能访问$message是因为它存在Vue构造函数的原型里
      //在router.js里this不是Vue实例,访问不到$message，可以用构造函数点出来
      Vue.prototype.$message.error('您还没有登录,3s跳到登录页面');
      setTimeout(() => {
        next('/');
      },3000);
      // 去登录页:使用next直接跳转路由
   
    }
  }
})



// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token_type')) {
      config.headers.Authorization = sessionStorage.getItem('token_type');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });

  // http response 拦截器
axios.interceptors.response.use(
  response => {

    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token');
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
