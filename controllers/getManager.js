// const router = require('express').Router()
// var user = require("../management/mongodb/models/user")
// var key = require("../management/key/index")

// const nanoid = require('nanoid');
// const moment = require('moment');
/**
 * 获取信息
 */
const router = require('express').Router()
var user = require("../management/mongodb/models/user")
var key = require("../management/key")
const { check, validationResult } = require('express-validator/check')
router.get('/api/getManager', [
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
  // pageSize
  const pageSize = Number(req.query.pageSize);
  const skipnum = (Number(req.query.pageNo) - 1) * pageSize;
  user.find({openId: 10000},{openId: 0, password: 0, avatar: 0}).populate('plat').skip(skipnum).limit(pageSize).sort({createTime: 1}).then(data => {
    if(data) {
      user.countDocuments({openId: 10000}, (err, count) => {
        res.send({ result: true, data: data, pageInfo: {
          pageSize: req.query.pageSize,
          pageNo: req.query.pageNo,
          totalCount: count
        }, msg: '查询成功。'})
      })
      
    } else {
      res.send({ result: true, data: null, msg: '查询成功。'})
    }
  })
})
module.exports = router;