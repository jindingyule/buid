const Mongoose = require("mongoose")
const Schema = Mongoose.Schema
// 好友列表 type 1 好友 2 群
const authentication = new Schema({
  createTime: Date, // 创建日期
  OperationTime: Date, // 操作日期
  openId: Number, // 表id 15000
  id: String, // 发送消息ID
  type: Number, // 1 好友 2 群
  senderUser: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  status: Number, // 1 添加好友 2 拒绝 6 通过
  targetId: String // 对方ID 1 用户ID 2 群ID
})
module.exports = mongoose.model('authentication', authentication)