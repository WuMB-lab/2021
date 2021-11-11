const path = require('path');
const webpack = require('webpack');
const SinobestGatherProjectInfo = require('sinobest-gather-projectinfo');
const packageJson = require('./package');

const name = 'SinoGear';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const options = {
	antDir: path.join(__dirname, './node_modules/ant-design-vue'),
	stylesDir: path.join(__dirname, './src/themes'),
	varFile: path.join(__dirname, './src/themes/variables.less'),
	mainLessFile: path.join(__dirname, './src/themes/default/index.less'),
	themeVariables: [
		'@primary-color',
		'@sg-primary-color',
		'@sg-left-top-logo-title-color',
		'@sg-top-header-bg',
		'@sg-header-right-content-color',
		'@sg-global-menu-font-color',
		'@sg-global-menu-bg',
		'@sg-global-menu-item-selected-bg',
		'@sg-global-menu-item-selected-border-right-color',
		'@sg-global-menu-item-selected-font-color',
		'@sg-global-menu-item-hover-font-color',
		'@sg-global-menu-item-active-font-color',
		'@sg-global-menu-sub-bg',
		'@sg-sider-header-bg',
		'@sg-header-bg',
		'@sg-left-top-logo-bg'
	]
};

const proxy = {
  '/api': {
    target: 'http://localhost:3005', // 需改为真实后端
    changeOrigin: true // 允许websockets跨域
  }
};

const hash = process.env.NODE_ENV === 'production' ? 'chunkhash:8' : 'hash:8';
const fileName = hash ? `[name]-[${hash}].js` : '[name].js';
const disableDynamicImport = true;

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/themes/default.less')
      ]
    }
  },
  devServer: {
    host: '0.0.0.0', // 允许外部ip访问
    port: 8000, // 端口
    proxy: noProxy ? {} : proxy
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      }
    }
  },
  configureWebpack(webpackConfig) {
    if (process.env.NO_CHUNK === 'false' || !disableDynamicImport) {
      // 配置第三方依赖包入口
      webpackConfig.entry.vendor = Object.keys(packageJson.dependencies); // 获取生产环境依赖库
      // 配置 chunk 输出的文件命名格
      webpackConfig.output.chunkFilename = fileName;
      webpackConfig.plugins.push(
          new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'runtime'],
            filename: fileName
          })
      );
    }
    Object.assign(webpackConfig, {
      name: name,
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          // '@c': path.resolve(__dirname, './src/components'),
          // '@p': path.resolve(__dirname, './src/pages')
        } // 别名配置
      }
    })
    webpackConfig.plugins.push(
      // 收集项目信息插件
      new SinobestGatherProjectInfo(),
    )
  }
};