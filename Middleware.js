

module.exports = async (req, res, next) => {
  const whitelist = require("./management/mongodb/models/whitelist")
  const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  const whiteListURL = ['/api/getlink']
  if(!whiteListURL.includes(req.path)) {
    whitelist.find({ openId: 15000}).then(data => {
      const ips = data.find(item => {
        return item.ip === IP
      })
      if(ips && ips.status === 1000) {
        next()
      } else {
        res.status(501).send('error!')
      }
    })
  } else {
    next()
  }
}