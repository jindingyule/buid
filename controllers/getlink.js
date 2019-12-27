// const router = require('express').Router()
// var user = require("../management/mongodb/models/user")
// var key = require("../management/key/index")

// const nanoid = require('nanoid');
// const moment = require('moment');
/**
 * 获取信息
 */
const router = require('express').Router()
var key = require("../management/key")
const async = require('async')
const { check, validationResult } = require('express-validator/check')
router.get('/api/getlink', [
  check('plat').custom(val => {
    if (!val) {
      throw new Error('plat不能为空')
    }
    return true
  })
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  lihks(req.query).then(data => {
    res.send(data)
  }).catch(error => {
    if(error.status === 422) {
      res.status(422).json({ errors: '改地址不存在，或者已失效' })
    } else {
      res.send(error)
    }
  })
})
const lihks = (body) => {
  const spreadLink = require("../management/mongodb/models/spreadLink")
  const platform = require("../management/mongodb/models/platform")
  return new Promise((resolve, reject) => {
    async.waterfall([(next)=>{
      platform.findOne({openId: 11000, url: body.plat, status: 1000}).then(plat => {
        if(plat) {
          next(null, plat)
        } else {
          return next({ result: false, data: null, msg: 'plat失败。'})
        }
      })
    }, (plat, next) => {
      spreadLink.find({openId: 13000, plat: plat._id, status: 1000}).then(link => {
        if (link) {
          const random = Math.floor(Math.random() * link.length + 1)
          next(null, {
            result: true,
            url: link[random-1].url,
            msg: '成功。'
          })
        } else {
          return next({ result: false, data: null, msg: 'link失败。'})
        }
      })
    }], (error, data) => {
      if(error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}
module.exports = router;