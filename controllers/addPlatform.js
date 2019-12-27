const router = require('express').Router()
var platform = require("../management/mongodb/models/platform")
var key = require("../management/key/index")
const { check, validationResult } = require('express-validator/check')
const nanoid = require('nanoid');
const moment = require('moment');
router.post('/api/addPlatform', [
  check('name').custom(val => {
    if (!val) {
      throw new Error('名称不能为空')
    }
    return true
  }),
  check('status').custom(val => {
    if (!val) {
      throw new Error('状态不能空')
    }
    return true
  }),
  check('url').custom(val => {
    if (!val) {
      throw new Error('主域名不能空')
    }
    return true
  })
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  const sessionUser = JSON.parse(key.decrypt(Buffer.from(req.session.user)))
  platform.create({
    name: req.body.name,
    status: req.body.status,
    remark: req.body.remark,
    url: req.body.url,
    openId: 11000,
    operator: sessionUser.userName,
    id: nanoid(24),
    createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    OperationTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }).then(data => {
    if (data) {
      res.send({ result: true, data: [], msg: '创建成功。'})
    } else {
      return res.send({ result: false, data: null, msg: "错误"})
    }
  })
})
module.exports = router;