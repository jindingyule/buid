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

// var user = require("../management/mongodb/models/user")
var key = require("../management/key")
const async = require('async')
const { check, validationResult } = require('express-validator/check')
router.post('/api/delectPlatForm', [
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
  delects(req.body).then(data => {
    res.send(data)
  }).catch(error => {
    res.send(error)
  })
})
const delects = (body) => {
  const platform = require("../management/mongodb/models/platform")
  const spreadLink = require("../management/mongodb/models/spreadLink")
  return new Promise((resolve, reject) => {
    async.waterfall([(next)=>{
      async.parallel({
        plat(next) {
          platform.deleteOne({openId: 11000, _id: body.id}).then(plat => {
            next(null, plat)
          })
        },
        link(next) {
          spreadLink.find({openId: 13000, plat: body.id}).then(link => {
            next(null, link)
          })
        }
      }, (error, {plat, link}) => {
        if(error) {
          return next({ result: false, data: null, msg: '失败。'})
        }
        next(null, {plat, link})
      })
    }, ({plat, link}, next) => {
      if(link) {
        spreadLink.deleteMany({_id: {$in: link}}).then(data => {
          next(null, data)
        })
      } else {
        next(null, link)
      }
    }], (error, data) => {
      if(error) {
        reject(error)
      } else {
        resolve({ result: true, data: null, msg: '操作成功。'})
      }
    })
  })
}
module.exports = router;