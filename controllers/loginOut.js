/**
 * 退出
 */
const router = require('express').Router()
router.get('/api/loginOut', (req, res) => {
  req.session.user = null
  res.send({ result: true, data: null, msg: '已经退出！'})
})
module.exports = router;