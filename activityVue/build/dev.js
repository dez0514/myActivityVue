const fs = require('fs')
const input = require('./input')
const path = require('path')
const year = new Date().getFullYear()
// const year = 2018
const argv = require('./argv')
const enableEslint = require('./enable-eslint')

// const server = require('./dev-server.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const notActive = ['wap', 'caizhi', 'knowledge']
const notActive = require('./notActive.js')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

async function exec () {
  console.log('CTRL + C 退出; 直接回车可选择默认值.')
  const project_name = process.env && process.env.projectName || await input('请输入项目名:')
  process.projectName = project_name
  let port = process.env.port || await input('是否设定端口? (默认8088): ')
  if (port === '') {
    port = 8088
  }
  let TARGET = path.resolve(__dirname, `../${argv.isPc ? 'src-pc' : 'src' }/${year}/activity_${project_name}`)
  let loof = 0
  // if (project_name === 'wap') {
  //   TARGET = path.resolve(__dirname, '../src/wap')
  // }
  if (notActive.includes(project_name)) {
    TARGET = path.resolve(__dirname, `../src/${project_name}`)
  }

  start()
  function start() {
    const isExist = fs.existsSync(TARGET)
    if (!isExist) {
      TARGET = path.resolve(__dirname, `../${argv.isPc ? 'src-pc' : 'src' }/${year - loof - 1}/activity_${project_name}`)
      if (loof > 0) console.log('项目不存在.')
      else {
        loof++
        start()
      }

      input.rl.close()
    } else {

      dev(TARGET, port)
      input.rl.close()
    }
  }

}

exec()

function dev (project_dir, port) {
  const server = require('./dev-server.js')
  server(config => {
    const MAINJS = path.resolve(project_dir, './main.js')
    // if (MAINJS) {
    config.entry.app = MAINJS
    // } else {
    // }
    // config.entry.app = path.resolve(project_dir, './main.ts')

    Object.keys(config.entry).forEach(function (name) {
      config.entry[name] = ['./build/dev-client'].concat(config.entry[name])
    })

    config.module.rules.push({
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      // include: [resolve('src/fenxiao2')],
      include: enableEslint.map(item => resolve(`src/${item}`)),
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    })

    config.plugins.push(new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(project_dir, './index.html'),
      inject: true
    }))
  }, port)
}
