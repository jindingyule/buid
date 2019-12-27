const router = require('express').Router()
// var user = require("../management/mongodb/models/user")
// var key = require("../management/key/index")
// const { check, validationResult } = require('express-validator/check')
// const nanoid = require('nanoid');
// const moment = require('moment');
// router.post('/api/login', [
//   check('userName').custom(val => {
//     if (!val) {
//       throw new Error('账户不能为空')
//     }
//     return true
//   }),
//   check('password').custom(val => {
//     if (!val) {
//       throw new Error('密码不能为空')
//     }
//     return true
//   })
// ], (req, res) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.send({ result: false, data: null, msg: errors.array().pop().msg})
//   }
//   user.findOne({ userName: req.body.userName }, {_id: 0,__v: 0, openId: 0, password: 0}).then(data => {
//     if (data) {
//       if(key.md5(req.body.password) !== req.body.password) {
//         return res.send({ result: false, data: null, msg: "账号或密码错误"})
//       }
//       user.findOneAndUpdate({ id: data.id  }, { isOnline: true }, {new: true}).then(updata => {
//         if(updata) {
//           req.session.user = key.encrypt(JSON.stringify({
//             userName: data.userName,
//             id: data.id,
//             isOnline: data.isOnline
//           }));
//           res.send({ result: true, data: null, msg: '登录成功。'})
//         }
//         console.log("更新成功")
//       })
//     } else {
//       res.send({ result: false, data: null, msg: '没有此账号。'})
//     }
//   })
// })
router.get('/api/test', (req,res) => {
  res.send({ result: false, data: [], msg: '自己该干啥，心里没个数吗?' })
})
module.exports = router;