import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import axios from 'axios'
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 5000;
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCookies)
/* eslint-disable no-new */
/*router 路由拦截*/
router.beforeEach((to, from, next) => {
   
  if (sessionStorage.getItem("token") !== null) {
    console.log(sessionStorage.getItem("token"));
    next()
  } else {
      //防止无限循环
      if (to.name === 'login' || to.name === 'register') {
          next();
          return;
      }
      
      app.$message.error('请先登录');
      next({
          path: '/login',
      });
  }
  
});


var app=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
