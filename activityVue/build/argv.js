/**
 * 获取参数
 */
const argvs = process.argv.splice(2)
module.exports = {
  isPublish: argvs.includes('publish'),
  // isPublish: false,
  isOnline: false,
  // isOnline: argvs.includes('online'),
  isPc: argvs.includes('pc'),
  needUpload: argvs.includes('upload')
  // needUpload: false
}