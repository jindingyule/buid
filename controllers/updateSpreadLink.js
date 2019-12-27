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
var spreadLink = require("../management/mongodb/models/spreadLink")
var key = require("../management/key")
const { check, validationResult } = require('express-validator/check')
router.post('/api/updateSpreadLink', [
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
  let data = null
  spreadLink.findOne({ id: req.body.id }).populate('plat').then(async link => {
    if(link.plat && link.plat.status === 1100) {
      res.send({ result: false, data: null, msg: '异常：平台已关闭。'})
    } else {
      data = await spreadLink.findOneAndUpdate({ id: req.body.id }, { status: req.body.status, OperationTime: new Date() }, {new: true})
      if(data) {
        res.send({ result: true, data: null, msg: '操作成功。'})
      } else {
        res.send({ result: false, data: null, msg: '操作失败。'})
      }
    }
  })
})
module.exports = router;