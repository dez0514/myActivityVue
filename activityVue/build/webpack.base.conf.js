var path = require('path')
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../')
const vuxLoader = require('vux-loader')
const alias_file = require('./alias')
const argv = require('./argv')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
let alias = {}
alias = Object.assign(alias, {
  'vue$': 'vue/dist/vue.esm.js',
  'cube-ui': 'cube-ui/lib',
  '@': resolve('src')
})
alias = Object.assign(alias, alias_file)

let webpackConfig = {
  entry: {},
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // {
      //   test: /\.json$/,
      //   loader: 'file-loader' 
      // },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      !argv.isPc ? {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/@wsloan/wsloan')]
      } : {},
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
          // name: '[name]-[hash:8].[ext]'

        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.mp3(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  }
}
module.exports = webpackConfig

console.log('2', process.projectName)
const theme = require('../config/theme.json')

const plugins = [
  'vux-ui',
  'progress-bar',
  {
    name: 'less-theme',
    path: theme[process.projectName] || theme['other']
  }
  // {
  //   name: 'style-parser',
  //   fn: function (source) {
  //     return "@import '../../../styles/base';"
  //   }
  // }
]
// TODO: 可能会不小心去掉应该存在的样式
// process.env.NODE_ENV === 'production' && plugins.push('duplicate-style')

module.exports = vuxLoader.merge(webpackConfig, {
  plugins
})
