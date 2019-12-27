
/**
 * 更新平台状态
 * status: 1000 / 1100
 */
const router = require('express').Router()
var key = require("../management/key")
const async = require('async')
const { check, validationResult } = require('express-validator/check')
router.post('/api/updatePlatform', [
  check('id').custom(val => {
    if (!val) {
      throw new Error('ID不能为空')
    }
    return true
  }),
  check('status').custom(val => {
    if (!val) {
      throw new Error('status不能为空')
    }
    return true
  }),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  if (!req.session.user) {
    return res.send({ result: false, data: null, msg: '已经退出！'})
  }
  const sessionUser = JSON.parse(key.decrypt(Buffer.from(req.session.user)))
  updatePlat(req.body, sessionUser).then(data => {
    res.send(data)
  }).catch(error => {
    res.send(error)
  })
})
const updatePlat = (body, sessionUser) => {
  var platform = require("../management/mongodb/models/platform")
  var spreadLink = require("../management/mongodb/models/spreadLink")
  return new Promise((resolve, reject) => {
    async.waterfall([(next)=>{
      async.parallel({
        plat(next) {
          platform.findOneAndUpdate({ _id: body.id }, { status: body.status, operator: sessionUser.userName, OperationTime: new Date() }, {new: true}).then(plat => {
            next(null, plat)
          })
        },
        link(next) {
          spreadLink.find({openId: 13000, plat: body.id}).then(link => {
            next(null, link)
          })
        }
      }, (error, {plat, link}) => {
        if(link) {
          spreadLink.updateMany({_id: {$in: link}}, {status: plat.status, OperationTime: new Date()}).then(data => {
            next(null, { result: true, data: null, msg: '操作成功。'})
          })
        } else {
          next(null, { result: true, data: null, msg: '操作成功。'})
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