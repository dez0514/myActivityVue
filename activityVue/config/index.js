// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
let argv = require('../build/argv.js')
const projectName = process.projectName
// const isFenxiao = projectName === 'fenxiao'
// const isRebate =   projectName === 'rebate'
// const isWxmall = projectName === 'wxmall'
// const isOnline = argv.isOnline 
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './', // './',  //
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8088,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    autoOpenBrowser: true,
    proxyTable: {
      // '/ajaxapi':{
      //   target: 'http://122.228.132.78:885',
      //   changeOrigin: true,
      //   secure: false
      // }
      // '/FanLiWangQian': {
      //   // target: 'http://192.168.31.148:8080',
      //   target: 'http://122.228.132.78:8085',
      //   // target: 'http://36.7.138.114:5026',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/m': {
      //   target: 'http://122.228.132.78:885',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/json': {
      //   target: 'http://122.228.132.78:124',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/rank': {
      //   target: 'http://192.168.31.18:8080',
      //   changeOrigin: true,
      //   secure: false
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}

