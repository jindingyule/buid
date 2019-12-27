
const whitelist = require("./controllers/whitelist")
const getWhiteList = require("./controllers/getWhiteList")
const delectWhiteIp = require("./controllers/delectWhiteIp")
const addWhiteIp = require("./controllers/addWhiteIp")
const updateWhiteIp = require("./controllers/updateWhiteIp")
const login = require("./controllers/login")
const userinfo = require("./controllers/userinfo")
const getManager = require("./controllers/getManager")
const addManager = require("./controllers/addManager")
const loginOut = require("./controllers/loginOut")
const addPlatform = require("./controllers/addPlatform")
const getPlatform = require("./controllers/getPlatform")
const updateManager = require("./controllers/updateManager")
const delectManager = require("./controllers/delectManager")
const updatePlatform = require("./controllers/updatePlatform")
const addSpreadLink = require("./controllers/addSpreadLink")
const getSpreadLink = require("./controllers/getSpreadLink")
const delectSpreadlink = require("./controllers/delectSpreadlink")
const updateSpreadLink = require("./controllers/updateSpreadLink")
const delectPlatForm = require("./controllers/delectPlatForm")
const getlink = require("./controllers/getlink")
module.exports = [
  whitelist,
  getWhiteList,
  delectWhiteIp,
  updateWhiteIp,
  addWhiteIp,
  login,
  userinfo,
  getManager,
  addManager,
  updateManager,
  delectManager,
  loginOut,
  addPlatform,
  delectPlatForm,
  getPlatform,
  updatePlatform,
  addSpreadLink,
  getSpreadLink,
  updateSpreadLink,
  delectSpreadlink,
  getlink
]