// remove
// const router = require('express').Router()
// var user = require("../management/mongodb/models/user")
// var key = require("../management/key/index")

// const nanoid = require('nanoid');
// const moment = require('moment');
/**
 * 删除白名单
 */
const router = require('express').Router()
var key = require("../management/key")
const { check, validationResult } = require('express-validator/check')
router.post('/api/delectWhiteIp', [
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
  let data = null
  const whitelist = require("../management/mongodb/models/whitelist")
  data = await whitelist.deleteOne({openId: 15000, id: req.body.id})
  if(data) {
    res.send({ result: true, data: null, msg: '操作成功。'})
  } else {
    res.send({ result: false, data: null, msg: '操作失败。'})
  }
})
module.exports = router;