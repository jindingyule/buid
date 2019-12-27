const router = require('express').Router()
// var user = require("../../manger/mongodb/models/user/index")
// var key = require("../../manger/key/index")
// const { check, validationResult } = require('express-validator/check')
// const nanoid = require('nanoid');
// const moment = require('moment');
router.get('/api/whitelist', (req,res) => {
  // const whitelist = require("./management/mongodb/models/whitelist")
  // whitelist.find({ openId: 15000}).then(data => {
  // })
  res.send({ result: false, data: [], msg: '自己该干啥，心里没个数吗?' })
})
module.exports = router;