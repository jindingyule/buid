/**
 * 添加IP
 */
const router = require('express').Router()
var key = require("../management/key/index")
const { check, validationResult } = require('express-validator/check')
const nanoid = require('nanoid');
const moment = require('moment');
router.post('/api/addWhiteIp', [
  check('name').custom(val => {
    if (!val) {
      throw new Error('名称不能为空')
    }
    return true
  }),
  check('ip').custom(val => {
    if (!val) {
      throw new Error('状态不能空')
    }
    return true
  })
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  const sessionUser = JSON.parse(key.decrypt(Buffer.from(req.session.user)))
  const whitelist = require("../management/mongodb/models/whitelist")
  whitelist.create({
    name: req.body.name,
    ip: req.body.ip,
    openId: 15000,
    operator: sessionUser.userName,
    id: nanoid(24),
    status: 1000,
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