// remove
// var user = require("../management/mongodb/models/user")
// var key = require("../management/key/index")

// const nanoid = require('nanoid');
// const moment = require('moment');
/**
 * 更新IP 状态
 */
const router = require('express').Router()
var key = require("../management/key")
const { check, validationResult } = require('express-validator/check')
router.post('/api/updateWhiteIp', [
  check('id').custom(val => {
    if (!val) {
      throw new Error('ID不能为空')
    }
    return true
  })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  if (!req.session.user) {
    return res.send({ result: false, data: null, msg: '已经退出！'})
  }
  const sessionUser = JSON.parse(key.decrypt(Buffer.from(req.session.user)))
  const whitelist = require("../management/mongodb/models/whitelist")
  let data = null
  data = await whitelist.findOneAndUpdate({ id: req.body.id }, { operator: sessionUser.userName,status: req.body.status, OperationTime: new Date() }, {new: true})
  if(data) {
    res.send({ result: true, data: null, msg: '操作成功。'})
  } else {
    res.send({ result: false, data: null, msg: '操作失败。'})
  }
})
module.exports = router;