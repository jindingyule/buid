// const router = require('express').Router()
// var user = require("../management/mongodb/models/user")
// var key = require("../management/key/index")
// const { check, validationResult } = require('express-validator/check')
// const nanoid = require('nanoid');
// const moment = require('moment');
/**
 * 获取信息
 */
const router = require('express').Router()
var user = require("../management/mongodb/models/user")
var key = require("../management/key")
router.get('/api/userinfo', (req, res) => {
  if (!req.session.user) {
    res.send({ result: false, data: null, msg: '已经退出！'})
  }
  const sessionUser = JSON.parse(key.decrypt(Buffer.from(req.session.user)))
  user.findOne({ userName: sessionUser.userName}, {_id: 0,__v: 0, openId: 0}).then(data => {
    if (data) {
      if(sessionUser.userName !== data.userName) {
        res.send({ result: false, data: data, msg: '请重新登录。'})
      } else {
        req.session.user = key.encrypt(JSON.stringify({
          userName: data.userName,
          id: data.id,
          password: data.password,
          roles: data.roles
        }));
        res.send({ result: true, data: data, msg: '查询成功。'})
      }
    } else {
      res.send({ result: false, data: null, msg: '不存在！'})
    }
  })
})
module.exports = router;