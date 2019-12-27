const Mongoose = require("mongoose")
const Schema = Mongoose.Schema
// 对话列表
const MessageMainSession = new Schema({
  createTime: Date, // 创建日期
  OperationTime: Date, // 操作日期
  openId: Number, // 表id 13000
  id: String,
  groupId: String, // 或者好友ID 群组ID 
  lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
  }, // 最后一条消息ID
})
module.exports = Mongoose.model('MessageMainSession', MessageMainSession)