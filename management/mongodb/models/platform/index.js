const Mongoose = require("mongoose")
const Schema = Mongoose.Schema
// 群
const platform = new Schema({
  createTime: Date, // 创建日期
  OperationTime: Date, // 操作日期
  openId: Number, // 表id 11000
  id: String, // 群组ID
  status: Number, // 状态
  name: String, // 平台名称
  url: String, // 主域名
  operator: String, // 操作人
  remark: String, // 备注
})
module.exports = Mongoose.model('RouterPlatform', platform)