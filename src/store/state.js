import { config } from '../common/config';

const state = {
  tabs: [{ name: 'HomeContainer', title: '主页', fullPath: '/home', path: '/home' }],
  currentTab: 'HomeContainer',
  notices: [],
  fetchingNotices: false,
  menus: config.extraMenus,
  subMenus: [],
  userAvatarKey: 'userAvatarKey',
  versionItem: null,
  validTokenSuccess: false,
  openKeys: [],
  setting: {
    ...config.globalSetting
  },
  currentUser: {
    name: 'zhangsan',
    key: '123'
  },
  collapse: false,
  drawer: false
};

export default state;
