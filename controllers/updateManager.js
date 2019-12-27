// remove
// const router = require('express').Router()
// var user = require("../management/mongodb/models/user")
// var key = require("../management/key/index")

// const nanoid = require('nanoid');
// const moment = require('moment');
/**
 * 更新管理员信息
 * type 1 修改密码 2启用禁用 3 删除
 */
const router = require('express').Router()
var user = require("../management/mongodb/models/user")
var spreadLink = require("../management/mongodb/models/spreadLink")
var key = require("../management/key")
const { check, validationResult } = require('express-validator/check')
router.post('/api/updateManager', [
  check('id').custom(val => {
    if (!val) {
      throw new Error('ID不能为空')
    }
    return true
  }),
  check('type').custom(val => {
    if (!val) {
      throw new Error('类型不能为空')
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
  if(sessionUser.userName !== 'admin') {
    if (sessionUser.password !== key.md5(req.body.oldPassword)) {
      return res.send({ result: false, data: null, msg: '旧密码有误，！'})
    }
  }
  let data = null
  const type = Number(req.body.type)
  if(type === 1) {
    data = await user.findOneAndUpdate({ id: req.body.id  }, { password: key.md5(req.body.newPassword), OperationTime: new Date() }, {new: true})
  } else if(type === 2) {
    data = await user.findOneAndUpdate({ id: req.body.id }, { status: req.body.status, OperationTime: new Date() }, {new: true})
  }
  if(data) {
    res.send({ result: true, data: null, msg: '操作成功。'})
  } else {
    res.send({ result: false, data: null, msg: '操作失败。'})
  }
})
module.exports = router;