const Mongoose = require("mongoose")
const Schema = Mongoose.Schema
// 用户
const user = new Schema({
  createTime: Date, // 创建日期
  OperationTime: Date, // 操作日期
  openId: Number, // 表id 10000
  id: String, // 个人id
  status: Number, // 状态
  userName: String,// 账户
  password: String,// 密码
  roles: Number, // 权限  1,2,3,4,5
  remark: String, // 个性签名
  avatar: String, //图片地址
  isOnline: {
    type: Boolean,
    default: false
  }
})
module.exports = Mongoose.model('RouterUser', user)