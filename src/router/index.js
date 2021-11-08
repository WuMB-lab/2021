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

// router.beforeEach(async (to, from, next) => {
//   console.log('to: ', to);
//   console.log('from: ', from);
//   if (state.menus.length === 0) {
//     await store.dispatch('getMenus');
//   }
//   next();
// });


export default router;