/**
 * 白名单列表
 */
const router = require('express').Router()
// var user = require("../../manger/mongodb/models/user/index")
// var key = require("../../manger/key/index")
// const { check, validationResult } = require('express-validator/check')
// const nanoid = require('nanoid');
// const moment = require('moment');
const { check, validationResult } = require('express-validator/check')
router.get('/api/getWhiteList',[
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
], (req,res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ result: false, data: null, msg: errors.array().pop().msg})
  }
  if (!req.session.user) {
    res.send({ result: false, data: null, msg: '已经退出！'})
  }
  const pageSize = Number(req.query.pageSize);
  const skipnum = (Number(req.query.pageNo) - 1) * pageSize;
  const whitelist = require("../management/mongodb/models/whitelist")
  whitelist.find({openId: 15000},{openId: 0, password: 0, avatar: 0}).populate('plat').skip(skipnum).limit(pageSize).sort({createTime: 1}).then(data => {
    if(data) {
      whitelist.countDocuments({openId: 15000}, (err, count) => {
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
  // res.send({ result: false, data: [], msg: '自己该干啥，心里没个数吗?' })
})
module.exports = router;