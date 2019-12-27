const Mongoose = require("mongoose")
const Schema = Mongoose.Schema
// 好友列表 type 1 好友 2 群
const Message = new Schema({
  createTime: Date, // 创建日期
  OperationTime: Date, // 操作日期
  openId: Number, // 表id 14000
  id: String, // 发送消息ID 
  // 消息内容类型
  // 1 文字消息 2语音消息 3图片消息 4文件消息 5位置消息 6自定义消息 12 系统消息
  type: Number,
  content: Object,
  senderUser: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  targetId: String,
  messageType: Number, // 9 系统通知
  mainSession: {
    type: Schema.Types.ObjectId,
    ref: 'MessageMainSession'
  }
})
module.exports = Mongoose.model('Message', Message)