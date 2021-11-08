import router from '../router/index';

import cloneDeep from 'lodash.clonedeep';



const actions = {
  getMenus: async (context) => {
    console.log('i am in action getMenus')
    let menus = [];
    context.commit('getMenuEnd', menus || []);
	},
  initInfos: (context) => {
    context.commit('getMenuEnd', []);
    const currentTab = '/home';
    const tabs = [{ name: 'HomeContainer', title: '主页', fullPath: '/home', path: '/home' }];
    context.commit('handleTabsChange', { currentTab, tabs });
	},
	changeCollapse: (context, payload) => {
		context.commit('getCollapse', payload);
	},
	changeDrawer: (context, payload) => {
		context.commit('getDrawer', payload);
	},
	chooseTabs: (context, payload) => {
    const currentTab = payload;
    const { tabs } = context.state;
    context.commit('handleTabsChange', { currentTab, tabs });
	},
	closeTabs: (context, payload) => {
    const newTabs = cloneDeep(context.state.tabs);
    let newCurrentTab = context.state.currentTab;
    let newPath = '';
    if (payload === newCurrentTab && newTabs && newTabs.length) {
      newTabs.forEach((tab, index) => {
        if (tab.fullPath === payload) {
          const nextTab = newTabs[index + 1] || newTabs[index - 1];
          if (nextTab) {
            newCurrentTab = nextTab.fullPath;
            newPath = nextTab.fullPath || nextTab.path || nextTab.name;
          }
        }
      });
    }
    const tabs = newTabs.filter(tab => tab.fullPath !== payload) || [];
    context.commit('handleTabsChange', { currentTab: newCurrentTab, tabs });
    router.push(newPath);
	},
	addTabs: (context, payload) => {
    const extraData = ['Exception404', 'Exception401', 'Exception403'];
    const newTabs = cloneDeep(context.state.tabs);
    let isExist = false;
    if (newTabs && newTabs.length) {
      newTabs.forEach((item) => {
        if (item.fullPath === payload.fullPath) {
          isExist = true;
        }
      });
    }
    if (!isExist && extraData.indexOf(payload.name) < 0) {
      newTabs.push(payload);
    }
    const currentTab = payload.fullPath;
    context.commit('handleTabsChange', { currentTab, tabs: newTabs });
	},
	initTabs: (context, payload) => {
    context.commit('handleTabsChange', payload);
	},
	closeAllTabs: (context) => {
    const currentTab = '/home';
    const tabs = [{ name: 'HomeContainer', title: '主页', fullPath: '/home', path: '/home' }];
    context.commit('handleTabsChange', { currentTab, tabs });
    router.push('/home');
	},
	closeOtherTabs: (context) => {
    const { tabs, currentTab } = context.state;
    const newTabs = [];
    if (tabs && tabs.length) {
      tabs.forEach((tab) => {
        if (tab.fullPath === currentTab) {
          if (tab.fullPath !== '/home') {
            newTabs.push({ name: 'HomeContainer', title: '主页', fullPath: '/home', path: '/home' });
          }
          newTabs.push(tab);
        }
      });
    }
    context.commit('handleTabsChange', { currentTab, tabs: newTabs });
	}
};

export default actions;
