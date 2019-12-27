const Mongoose = global.Mongoose = require("mongoose")
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m,i){
            return args[i];
        });
}
// MessageMainSession
class MongooseAsync{
    constructor(){
    }
    async connect(account,pass,ip,port,dbName){
        let vm = this;
        return await new Promise((resolve, reject) => {
            let url = "mongodb://{0}:{1}@{2}:{3}/{4}";
            url = url.format(account,pass,ip,port,dbName);
            vm.db= Mongoose.connect(url,{
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // bufferMaxEntries: 0,   /* B */
                // autoReconnect: true, /* C, default is true, you can ignore it */
                // poolSize: 5  
                // auth:{
                //     authdb:"admin",
                //     user: account,
                //     password: pass
                // }
            });
            vm.db = Mongoose.connection;
            vm.db.on('connected', function () {
                // console.log('Mongoose connection open to ' + DB_URL);
                resolve(true)
            });
            vm.db.on("error",function (error) {
                console.log(error);
                resolve(false);
                // vm.connect(account, pass, ip, dbName);

            });
            vm.db.on("open",function (callback) {
                console.log("数据库连接成功");
            });
            vm.db.on('close', function () {
                vm.connect(account, pass, ip, dbName);
            });
            vm.db.on('disconnected', function () {
                console.log('Mongoose connection disconnected');
                // vm.connect(account, pass, ip, dbName);
                // resolve(false)
            });
        })
    }
    makeModel(name,modelJson){//创建model
        var schema =  new Mongoose.Schema(modelJson);
        var model = this.db.model(name,schema);
        this.models[name] = model;
        return model;
    }
    getModle(name){//获取model
        return this.models[name];
    }
}
module.exports = MongooseAsync;
// mongo --port 27017 -u "admin" -p "qazqwe123" --authenticationDatabase "admin"