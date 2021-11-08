import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

// 首页
import routes  from './routes.js'


Vue.use(Router);

const router = new Router({
  routes,
  mode: 'hash'
})

router.beforeEach(async (to, from, next) => {
  console.log('to: ', to);
  console.log('from: ', from);
  await store.dispatch('getMenus');
  next();
});


export default router;