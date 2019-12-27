const redis = require("redis")
var config = require("../../config/index");
// var redisClient = redis.createClient;
const redisClient = redis.createClient({port: config.redis.port, host: config.redis.host, password: config.redis.pwd});
const sub = redis.createClient({port: config.redis.port, host: config.redis.host, password: config.redis.pwd});
const pub = redis.createClient({port: config.redis.port, host: config.redis.host, password: config.redis.pwd});
redisClient.on("error", function (err) {
  console.log("Error " + err);
});
// runSample
redisClient.on("connect", async () => {
  console.log("redis 连接成功！")
  // await setKey('string key', 'Hello World')
  // let res = setKey('string key', 'Hello World', 30)
  // await redisClient.expire('string key', 3)
  // const key = await getKey('string key')
  // let count = 1
  // const times = setInterval(async () => {
  //   const key = await getKey('string key')
  //   console.log(key + count)
  //   // redisClient.ttl('string key', writeTTL)
  //   count++;
  //   if(count === 50 ) {
  //     clearInterval(times)
  //   }
  // }, 1000)
});
function writeTTL(err, data) {
  console.log('I live for this long yet: ' + data);
}
const setKey = (key,value) =>{
  return new Promise((resolve, reject) => {
    redisClient.set(key,value,(err,replay)=>{
      if(err){
        reject(err);
      }else{
        resolve(replay);
      }
    })
  })
};
let setEx = function(key, value, timeout) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, (err,replay) => {
      if(err) {
        reject(err)
      } else {
        redisClient.expire(key, timeout);
        resolve(replay);
      }
    });
  })
};
let getKey = (key)=>{
  return new Promise((resolve, reject) => {
    redisClient.get(key,(err,replay)=>{
      if(err){
        reject(err);
      }else{
        resolve(replay);
      }
    })
  })
};
let del = (key)=>{
  return new Promise((resolve, reject) => {
    redisClient.del(key,(err,replay)=>{
      if(err){
        reject(err);
      }else{
        resolve(replay);
      }
    })
  })
};
module.exports = {
  redisClient, setKey, getKey, sub, pub, del
};