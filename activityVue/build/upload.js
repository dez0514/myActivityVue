/**
 * 将打包后的文件上传到 服务器上
 */
const path = require('path')
// const copyFile = require('./copyFile');
const fs = require('fs')
const fse = require('fs-extra')
const ora = require('ora')
const argv = require('./argv')
module.exports = function upload(target) {
  // target 可能值为 '2017/active' 或 caizhi

  let spinner = ora('正在上传...')
  spinner.start()

  console.log(argv)
  let pDir = (argv.isTg ? 'tg' : 'app')
  console.log('pDir', pDir)
  let targetDir = '\\\\192.168.3.12\\WS.Active\\' + pDir + '\\' + target.replace('/', '\\')
  let dir = path.resolve(__dirname, '../../' + pDir + '/' + target)
  // let dir = path.resolve(__dirname, '../dist')
  let lock = targetDir + '/upload.lock'
  console.log('isLock', lock)
  let isLock
  try {
    isLock = fs.statSync(lock)
  } catch (e) {
    isLock = false
  }

  try {
    // 判断是否存在
    if (isLock) {
      console.log('有人在上传\n')
      return false
    }
    // 锁定
    try {

      fs.openSync(lock, 'w')
    } catch (e) { }
    // 复制
    fse.copySync(dir, targetDir)
    spinner.stop()

    // 解锁
    try {

      fs.unlinkSync(lock)
    } catch (e) { }
    console.log('复制完成\n')
  } catch (e) {
    console.log('复制出错!. 请检查服务器文件夹\n')
    console.log(e)
    console.log(targetDir)
    fs.unlinkSync(lock)
  }
}

// upload('caizhi')
