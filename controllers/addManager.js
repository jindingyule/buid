const router = require('express').Router()
var user = require("../management/mongodb/models/user")
var key = require("../management/key/index")
const { check, validationResult } = require('express-validator/check')
const nanoid = require('nanoid');
const moment = require('moment');
router.post('/api/addManager', [
  check('userName').custom(val => {
    if (!val) {
      throw new Error('账户不能为空')
    }
    return true
  }),
  check('roles').custom(val => {
    if (!val) {
      throw new Error('roles权限')
    }
    return true
  }),
  check('remark').custom(val => {
    if (!val) {
      throw new Error('请填写备注')
    }
    return true
  })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
   user.findOne({ userName: req.body.userName }, {_id: 0,__v: 0, openId: 0}).then( queryData => {
     if(queryData) {
       return res.send({ result: false, data: null, msg: '该用户已存在。'})
     } else {
        user.create({
          openId: 10000,
          id: nanoid(24),
          userName: req.body.userName,
          password: key.md5('123456'),
          status: 1000,
          roles: req.body.roles,
          remark: req.body.remark,
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          OperationTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }).then(data => {
          if (data) {
            res.send({ result: true, data: data, msg: '创建成功。'})
          } else {
            return res.send({ result: false, data: null, msg: "错误"})
          }
        })
     }
  })
})
module.exports = router;