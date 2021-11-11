import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store/index';
// import state from '../store/state';

// 首页
import routes  from './routes.js'


Vue.use(Router);

const router = new Router({
  routes,
  mode: 'hash'
})

// 起始地址和目的地址相同的情况，防止报错，设置一下内容
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};


export default router;