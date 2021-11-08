import 'es6-promise';
import 'fetch-ie8';
import 'babel-polyfill';
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import './themes/index.less';
import './resources/fonts/iconfont.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

