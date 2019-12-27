const Mongoose = require("mongoose")
const Schema = Mongoose.Schema
// 用户
const user = new Schema({
  createTime: Date, // 创建日期
  OperationTime: Date, // 操作日期
  openId: Number, // 表id 15000
  name: String, // 名称
  operator: String, // 操作人
  status: Number, // 1000 1100 状态
  id: String, // 个人id
  ip: String, // 状态
})
module.exports = Mongoose.model('whitelist', user)