const Mongoose = require("mongoose")
const Schema = Mongoose.Schema
// 群
const spreadLink = new Schema({
  createTime: Date, // 创建日期
  OperationTime: Date, // 操作日期
  openId: Number, // 表id 13000
  id: String, // 群组ID
  status: Number, // 状态
  url: String,
  operator: String, // 操作人
  remark: String, // 备注
  name: String, // 平台
  plat: {
    type: Schema.Types.ObjectId,
    ref: 'RouterPlatform'
  }
})
// link

module.exports = Mongoose.model('spreadLink', spreadLink)