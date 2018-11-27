const fs = require('fs')
const path = require('path')
const TEMPLATE = path.resolve(__dirname, './template/')
const fse = require('fs-extra')
const input = require('./input')
const year = new Date().getFullYear()

async function exec () {
  const project_name = await input('请输入项目名:')
  const TARGET = path.resolve(__dirname, `../src/${year}/activity_${project_name}`)
  const isExist = fs.existsSync(TARGET)
  if (isExist) {
    console.log('该项目已存在, 请重新输入')
    exec()
  } else {
    fse.copySync(TEMPLATE, TARGET)
    console.log(`${project_name}项目创建成功.`, '请通过 npm run dev 来执行')
    input.rl.close()
  }
}

exec()
