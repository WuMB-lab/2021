import 'es6-promise';
import 'fetch-ie8';
import 'babel-polyfill';
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import './themes/index.less';
import './themes/variables.less'
import './resources/fonts/iconfont.css';
import { message, Modal, Drawer, notification } from 'ant-design-vue';
import cssVars from 'css-vars-ponyfill';
cssVars({ watch: true, silent: true });


Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.config.productionTip = false;
Vue.use(Modal);
Vue.use(Drawer);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

