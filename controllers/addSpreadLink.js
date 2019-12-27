const router = require('express').Router()
var spreadLink = require("../management/mongodb/models/spreadLink")
var key = require("../management/key/index")
const { check, validationResult } = require('express-validator/check')
const nanoid = require('nanoid');
const moment = require('moment');
router.post('/api/addSpreadLink', [
  check('url').custom(val => {
    if (!val) {
      throw new Error('请输入URL')
    }
    return true
  }),
  check('id').custom(val => {
    if (!val) {
      throw new Error('请选择平台')
    }
    return true
  }),
  check('name').custom(val => {
    if (!val) {
      throw new Error('平台名称不能为空')
    }
    return true
  })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  const sessionUser = JSON.parse(key.decrypt(Buffer.from(req.session.user)))
  const obj = {
    remark: '',
    url: req.body.url,
    plat: req.body.id,
    name: req.body.name,
    operator: sessionUser.userName,
    id: nanoid(24),
    openId: 13000,
    status: 1000,
    createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    OperationTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }
  spreadLink.create(obj).then(data => {
    if (data) {
      res.send({ result: true, data: null, msg: '创建成功。'})
    } else {
      return res.send({ result: false, data: null, msg: "错误"})
    }
  })
})
module.exports = router;