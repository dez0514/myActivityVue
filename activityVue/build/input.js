const readline = require('readline');

//  读取命令行
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
//  获取输入
function input (text) {
  return new Promise(resolve => {
    rl.question(text, answer => {
      resolve(answer)
    })
  })
}

input.rl = rl

module.exports = input
