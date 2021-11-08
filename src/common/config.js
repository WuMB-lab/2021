import extraMenus from './extraMenu.json';

const sggc = window.SinoGearGlobalConfig;
const defaultConfig = {
  collapsed: false,
  name: 'SinoGear',
  username: '村民', // 当登录成功，sessionStorage中user_info不存在，或user_info.username不存在时默认显示名字
  messageDuration: 2.5,
  massageMaxCount: 1,
  notificationDuration: 5,
  extraMenus,
  globalSetting: {
    layout: 'sider-layout',
    showBreadcrumb: false,
    // 是否开启多标签页
    enableMultiTags: false,
  },
  menusControl: [
    '/account/setting',
    '/account/setting/base',
    '/account/setting/notification',
    '/account/setting/update-password',
    '/account/setting/user-status',
    '/trigger/exception'
  ],
  contextPath: process.env.contextPath || ''
};

const config = { ...defaultConfig, ...sggc };

export { config };
