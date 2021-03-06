const router = require('express').Router()
var user = require("../management/mongodb/models/user")
var key = require("../management/key/index")
const { check, validationResult } = require('express-validator/check')
const nanoid = require('nanoid');
const moment = require('moment');
router.post('/api/login', [
  check('userName').custom(val => {
    if (!val) {
      throw new Error('账户不能为空')
    }
    return true
  }),
  check('password').custom(val => {
    if (!val) {
      throw new Error('密码不能为空')
    }
    return true
  })
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  user.findOne({ userName: req.body.userName }).then(data => {
    if (data) {
      if(key.md5(req.body.password) !== data.password) {
        return res.send({ result: false, data: null, msg: "账号或密码错误"})
      }
      if(data.status !== 1000) {
        return res.send({ result: false, data: null, msg: "禁用，请联系管理员"})
      }
      user.findOneAndUpdate({ id: data.id  }, { isOnline: true }, {new: true}).then(updata => {
        if(updata) {
          req.session.user = key.encrypt(JSON.stringify({
            userName: updata.userName,
            id: updata.id,
            password: updata.password,
            roles: updata.roles
          }));
          res.send({ result: true, data: {
            roles: updata.roles,
            id: updata.id,
            userName: updata.userName
          }, msg: '登录成功。'})
        }
      })
    } else {
      res.send({ result: false, data: null, msg: '没有此账号。'})
    }
  })
})
module.exports = router;