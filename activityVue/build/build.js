let checkCodeVersion = require('./checkVer')
let argv = require('./argv.js')
let upload = require('./upload.js')

process.env.NODE_ENV = 'production'

let ora = require('ora')
let rm = require('rimraf')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack')
// let config = require('../config')
let input = require('./input')
const fs = require('fs')
const fse = require('fs-extra')
const year = new Date().getFullYear()
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 非活动项目
const notActive = require('./notActive.js')
const platforms = `${argv.isPc ? 'pc' : 'app'}`

var spinner
// 打包
async function build(TARGET_STR, TARGET, ENV) {
  const isOnline = ENV === 'online'
  let webpackConfig = require('./webpack.prod.conf')

  spinner.text = '打包文件...'
  webpackConfig.entry.app = path.resolve(TARGET, './main.js')
  TARGET_STR = TARGET_STR.replace(/activity_/g, '')

  // webpackConfig.output.path = path.resolve(__dirname, isOnline ? `../../../${TARGET_STR}` : `../../${platforms}/${TARGET_STR}`)
  webpackConfig.output.path = path.resolve(
    __dirname,
    argv.isOnline
      ? `../../${platforms}/${TARGET_STR}`
      : `../../${platforms}/${TARGET_STR}`
  )
  webpackConfig.output.publicPath = argv.isOnline
    ? `${webpackConfig.output.publicPath}${platforms}/${TARGET_STR}/`
    : webpackConfig.output.publicPath
  let minify = argv.isPublish
    ? {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
    : {}

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.resolve(webpackConfig.output.path, './index.html'),
      template: path.resolve(TARGET, './index.html'),
      inject: true,
      minify,
      chunksSortMode: 'dependency'
    })
  )

  webpack(webpackConfig, async function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    // 自动上传测试
    // if (argv.needUpload) {
    //   upload(TARGET_STR)
    //   return false
    // }

    console.log(chalk.cyan('  打包完成.\n'))
    console.log(TARGET_STR)
    // let result = await input('是否上传文件?(y/n/o)')
    // input.rl.close()
    // if (result === 'y' || result === 'Y') {
    //   upload(TARGET_STR)
    // }
    // if (result === 'o' || result === 'O') {
    //   let upload = require('./upload-cdn.js')

    //   upload('../../app/' + TARGET_STR)
    // }
  })
}

async function exec() {
  const project_name = await input('请输入项目名:')
  process.projectName = project_name
  let TARGET_STR = `${year}/activity_${project_name}`
  let name = project_name.split('-')
  let loof = 0
  if (notActive.includes(name[0])) {
    TARGET_STR = name[0]
  }
  // if (name[0] === 'wap') {
  //   TARGET_STR = 'wap'
  // }
  // if (name[0] === 'caizhi') {
  //   TARGET_STR = 'caizhi'
  // }
  start()
  function start() {
    const TARGET = path.resolve(
      __dirname,
      `../${argv.isPc ? 'src-pc' : 'src'}/${TARGET_STR}`
    )
    const isExist = fs.existsSync(TARGET)

    if (!isExist) {
      TARGET_STR = `${year - loof - 1}/activity_${project_name}`
      if (loof > 0) {
        console.log('项目不存在.')
      } else {
        loof++
        start()
      }
      input.rl.close()
    } else {
      spinner = ora('删除文件')
      spinner.start()
      // 这里添加 删除目录
      fse.removeSync(
        path.resolve(
          __dirname,
          `../../${platforms}/${year - loof - 1}/${project_name}`
        )
      )
      build(TARGET_STR, TARGET, name[1], project_name)
    }
  }
}

// 禁止注释此代码，发现必须打断腿
checkCodeVersion(exec)
