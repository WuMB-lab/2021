# sinogear-frontend-starter-vue

vue版赛姬前端项目脚手架工程。

## 目录介绍

```md
│  .eslintrc.js                              // eslint配置
│  .gitignore                                // git的忽略列表
│  babel.config.js                           // babel配置
│  vue.config.js                             // webpack配置
│  package.json                              // node的配置文件
│  README.md                                 // 本介绍文档
│  yarn.lock                                 // 依赖包安装信息
│  
├─public
│      favicon.png                           // favicon
│      index.html                            // html入口
│
└─src
    │  App.vue                               // 全局页面入口
    │  main.js                               // 全局配置文件入口
    │  
    ├─resources                             // 本地静态资源
    │  ├─fonts                             // 图标资源
    │  │      iconfont.css
    │  │      iconfont.eot
    │  │      iconfont.js
    │  │      iconfont.json
    │  │      iconfont.svg
    │  │      iconfont.ttf
    │  │      iconfont.woff
    │  │      iconfont.woff2
    │  │
    │  ├─images                             // 图片资源
    │  │      logo_SinoGear4.svg
    │  │
    │  └─js                                 // js资源
    ├─common                                 // 公共配置文件
    ├─components                             // 公共组件
    │      GlobalHeader.vue
    │
    ├─router                                 // 路由
    │      index.js
    │
    ├─store                                  // 状态管理
    │      actions.js
    │      getters.js
    │      index.js
    │      mutation-types.js
    │      mutations.js
    │      state.js
    │
    ├─themes
    │      default.less                       // 全局less变量
    │
    ├─utils                                  // 公共方法
    │      func.js
    │
    └─modules                                // 页面
        ├─example
        │  │                                 // 示例项目
        │  ├─resources                      // 示例项目静态资源文件
        │  │       fonts                     // 示例项目图标资源
        │  │       images                    // 示例项目图片资源
        │  │       js                        // 示例项目js资源
        │  │
        │  ├─themes
        │  │       default.less              // 示例项目less变量
        │  │
        │  ├─components                     // 示例项目公共组件
        │  │       example-menu.vue
        │  │
        │  └─views                          // 示例项目页面
        │          example-carousel.vue
        │          example-table.vue
        │          index.vue
        │
        └─home                               // 首页
                index.vue
```