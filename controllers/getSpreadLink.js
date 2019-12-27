/**
 * 获取信息
 */
const router = require('express').Router()
var key = require("../management/key")
const async = require('async')
const { check, validationResult } = require('express-validator/check')
router.get('/api/getSpreadLink', [
  check('pageSize').custom(val => {
    if (!val) {
      throw new Error('条数不能为空')
    }
    return true
  }),
  check('pageNo').custom(val => {
    if (!val) {
      throw new Error('页数不能为空')
    }
    return true
  })
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  if (!req.session.user) {
    res.send({ result: false, data: null, msg: '已经退出！'})
  }
  find(req.query).then(data => {
    res.send(data)
  }).catch(error => {
    res.send(error)
  })
})
const find = (body) => {
  const platform = require("../management/mongodb/models/platform")
  const spreadLink = require("../management/mongodb/models/spreadLink")
  const pageSize = Number(body.pageSize);
  const skipnum = (Number(body.pageNo) - 1) * pageSize;
  let query = {
    openId: 13000,
    status: {
      $in: [1000, 1100]
    }
  }
  if(body.status) {
    query.status = [Number(body.status)]
  }
  if(body.name) {
    query.name = body.name
  }
  return new Promise((resolve, reject) => {
    async.waterfall([(next)=>{
      async.parallel({
        spread(callback){
          spreadLink.find(query,{ openId: 0, __v: 0}).skip(skipnum).limit(pageSize).sort({createTime: 1}).then(spread => {
            callback(null, spread)
          })
        },
        pageInfo(callback) {
          spreadLink.countDocuments(query, (err, count) => {
            callback(null, {
              pageSize: pageSize,
              pageNo: Number(body.pageNo),
              totalCount: count
            })
          })
        }
      },(error, {spread, pageInfo}) => {
        next(null, {spread, pageInfo})
      })
    }, ({spread, pageInfo}, next) => {
      let data = {
        result: true,
        msg: '查询成功。'
      }
      if(spread) {
        data.data = spread
      } else {
        data.data = []
      }
      next(null, Object.assign(data, {pageInfo: pageInfo}))
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