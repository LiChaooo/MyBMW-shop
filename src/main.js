import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router/index';
import store from './store/index';
import './assets/css/reset.css';
import '../node_modules/animate.css/animate.min.css';
import ElementUI from 'element-ui';
import './assets/css/reset.css'



//添加element-ui组件
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;

//设置axios默认地址，并挂载到Vue的原型链中
// let instance = axios.create({
      //baseURL: "https://aftersales.bmw.com.cn";
//   baseURL:'https://aftersales.bmw.com.cn'
    // baseURL: "/";
// })
//初始化用户登录状态
let username=localStorage.info;
if(username){
  store.commit('changeLoginMut');
}
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
