/**
 * 获取信息
 */
const router = require('express').Router()
var platform = require("../management/mongodb/models/platform")
var key = require("../management/key")
const { check, validationResult } = require('express-validator/check')
router.get('/api/getPlatform', [
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
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  if (!req.session.user) {
    res.send({ result: false, data: null, msg: '已经退出！'})
  }
  
  let query = {
    openId: 11000,
    status: {
      $in: [1000, 1100]
    }
  }
  if(req.query.status) {
    query.status = {
      $in: [Number(req.query.status)]
    }
  }
  const pageSize = Number(req.query.pageSize);
  const skipnum = (Number(req.query.pageNo) - 1) * pageSize;
  const data = await platform.find(query, { openId: 0 , __v: 0}).skip(skipnum).limit(pageSize).sort({createTime: 1})
  if(data) {
    platform.countDocuments(query, (err, count) => {
      res.send({ result: true, data: data, pageInfo: {
        pageSize: pageSize,
        pageNo: Number(req.query.pageNo),
        totalCount: count
      }, msg: '查询成功。'})
    })
  } else {
    res.send({ result: true, data: [], msg: '查询成功。'})
  }
})
module.exports = router;