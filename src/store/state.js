import { config } from '../common/config';
import userImg from '../resources/images/user.jpg'

const state = {
  tabs: [{ name: 'HomeContainer', title: '主页', fullPath: '/home', path: '/home' }],
  currentTab: 'HomeContainer',
  notices: [],
  fetchingNotices: false,
  menus: config.extraMenus,
  subMenus: [],
  imageUrl: userImg,
  userAvatarKey: 'userAvatarKey',
  versionItem: null,
  validTokenSuccess: false,
  openKeys: [],
  setting: {
    ...config.globalSetting
  },
  currentUser: {
    username: 'guest',
    key: '123'
  },
  collapse: false,
  drawer: false
};

export default state;
