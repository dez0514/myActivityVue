/**
 * 该文件用来检查本地的版本和远程的版本.
 * 防止出现版本覆盖错误
 */

var chalk = require('chalk')
const path = require('path')
const local = path.resolve(__dirname, '../')

// 这是读取本地的版本.
const simpleGit = require('simple-git')
let finish

function check (location, str) {
  const localGit = simpleGit(location)
  return new Promise((resolve, reject) => {
    chalk.blue('正在检查 当前分支的代码已同步')
    console.log('正在检查代码同步情况')
    localGit.fetch((err, data) => {
      // if (err) throw err
      localGit.status((err, data) => {

        if (err) throw err
        // 在分支后. 还未拉取代码
        if (data.behind > 0) {
         let text = chalk.yellow(`${str}代码还未拉取, 落后服务端${data.behind}次提交`)
          console.log(text)
          return reject('报错')
        }
        if (data.ahead > 0) {
          let text = chalk.yellow(`${str}代码还未推送, 领先服务端${data.behind}次提交`)
          console.log(text)
          return reject('报错')
        }
        if (data.not_added && data.not_added.length > 0) {
          let text = chalk.yellow(`${str}代码还未提交 请先提交`)
          console.log(text)
          return reject('报错')
        }
        console.log(chalk.yellow('代码已同步\n'))
        // finish()
        resolve()
      })
    })
  })
}

async function checkVer (callback) {
  let isPass = true
  try {
    // await check(local, '本地')
    callback()
  } catch (e) {
    isPass = false
  }
  return isPass
}
module.exports = checkVer
// checkVer()
