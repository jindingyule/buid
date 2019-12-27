var express = require('express');
var app = express();
var server = require('http').createServer(app);
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require("./management/redis/index");
const RedisStore = require('connect-redis')(session);
const config = require("./config/index");
const MongooseAsync = require("./management/mongodb/index")
const Middleware = require("./Middleware")
// const mongodb = require('./management/mongodb/index');
const mainRoutes = require("./routers.js")
var port = 6001
// var port = parseInt(process.argv[2])
// var port = 6001 + parseInt(process.env.NODE_APP_INSTANCE)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  name : "sid",
  secret: 'qwertyuiopasdfghjklzxcvbnm,./123456789/*-0.13',
  store: new RedisStore({client: redis.redisClient }),  // (使用redis的存储session)
  resave: false,  // 是否每次都重新保存会话，建议false
  saveUninitialized: true,
  cookie: {
      secure: false,
      maxAge: 1 * 24 * 60 * 60 * 1000
  } // 有效期，单位是毫秒, 这里设置的是10分钟
}));
// app.use()
const asyncRun = async function(){
  const mongodb = new MongooseAsync();
  await mongodb.connect(
    config.mongodb.name,
    config.mongodb.pwd,
    config.mongodb.host,
    config.mongodb.port,
    config.mongodb.db
  );
  app.disable('etag');
  app.use(Middleware, mainRoutes)
}
asyncRun()
// var port = 6001 + parseInt(process.env.NODE_APP_INSTANCE)
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
});