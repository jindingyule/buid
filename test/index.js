var MongooseAsync = require('../management/mongodb/index');
var config = require("../config/index");
const key = require("../management/key")
var Assert = require('assert');
const nanoid = require('nanoid');
const moment = require('moment');
describe('测试二分查找算法',function(){
    // var ins = Manager.instance();
    const mongodb = new MongooseAsync();
    it('测试链接', async function(){
        var ok = await mongodb.connect(
            config.mongodb.name,
            config.mongodb.pwd,
            config.mongodb.host,
            config.mongodb.port,
            config.mongodb.db
        );
        Assert.equal(true,ok)
    });
    it('创建一条账户',async function(){
        // var platform = require("../management/mongodb/models/platform")
        // const whitelist = require('../management/mongodb/models/whitelist')
        /**
         * 添加用户
         */
        // let data = {
        //     openId: 10000,
        //     id: nanoid(24),
        //     userName: 'admin',
        //     password: '123456',
        //     status: 1000,
        //     roles: 1,
        //     remark: '',
        //     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        //     createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //     OperationTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        // };
        // const data = await user.create({
        //     openId: 10000,
        //     id: nanoid(24),
        //     userName: 'admin',
        //     password: key.md5('123456'),
        //     status: 1000,
        //     roles: 1,
        //     remark: '',
        //     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        //     createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //     OperationTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        // })
        // Aa147369
        // const data = await user.findOneAndUpdate({ userName: 'admin' }, { password: key.md5('Aa147369'), OperationTime: new Date() }, {new: true})
        // // const data = await user.findOne({userName: 'admin'})
        // console.log(data)
        // Assert.equal(true, data.userName === 'admin')
        const whitelist = require('../management/mongodb/models/whitelist')
        const data = await whitelist.create({
            openId: 15000,
            id: nanoid(24),
            status: 1000,
            name: 'garry',
            ip: '180.232.25.49',
            createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            OperationTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })
        console.log(data)
        Assert.equal(true, data.ip === '180.232.25.49')
        // // // var okInfo = await ins.insertDocuments(data,10000, 'user');
        // Assert.equal(true, data.userName === 'admin') Aa147369
        // const spreadLink = require("../management/mongodb/models/spreadLink")
        // const data = await spreadLink.find({ openId: 13000, name: '幸运棋牌'})
        // // .skip(0).limit(10).sort({createTime: 1})
        // spreadLink.updateMany({_id: {$in: data}}, { plat: '5e0442357b4a0720398b0db0' }, {new: true}).then(plat => {
        // })
        // Assert.equal(true, data[0].openId === 13000)
        // const data = await user.findOne({ userName: 'admin' })
        // console.log(data)
        // Assert.equal(true, data.userName === 'admin')
        // let data = {
        //     userName: '小华',
        //     password: CryptoCodes.encrypt('123456'),
        //     moblie: 99999999999,
        //     city: 'zh', sex: 0, remark: '测试',
        //     avatarUri : "https://han960619.github.io/Vue-chat/static/images/%E5%B0%8F%E5%A7%A8%E5%A6%88.jpg"
        // };
        // var okInfo = await ins.insertDocuments(data,10000, 'user');
        // Assert.equal(true, okInfo.userName === '小华')
        /**
         * 查询一条记录
         */
        // console.log(okInfo) { id: req.body.id }, {$pullAll: { userIds: [user.id] }}
        // var okInfo = await ins.find({ userId: 'E0ehc2DNqOWOj4YGm90FoAFp', openId: 13001 }, 'MessageSession')
        // // findByOne({id: 'E0ehc2DNqOWOj4YGm90FoAFp'}, 'user'); E0ehc2DNqOWOj4YGm90FoAFp
        // console.log(okInfo)
        // Assert.equal(true, okInfo.userId === 'E0ehc2DNqOWOj4YGm90FoAFp')
        /**
         * 创建群
         */
        // var req = await ins.findByOne({userName: "小明"}, 'user');
        // let data = {
        //     sign: req.id,
        //     userIds: [
        //         { userId: req.id, userName: req.userName, avatar: req.avatarUri }
        //     ],
        //     remark: '测试',
        //     name: '测试二群',
        //     avatarUri : "https://avatars1.githubusercontent.com/u/15651299?s=64&v=4"
        // };
        // console.log(data)
        // var okInfo = await ins.insertDocuments(data,11000, 'create-group');
        // Assert.equal(true, okInfo.name === '测试二群')
        // /**
        //  * 创建绘画记录
        //  */
        // let data = {
        //     sign: req.id,
        //     userIds: [
        //         { userId: req.id, userName: req.userName, avatar: req.avatarUri }
        //     ],
        //     remark: '测试',
        //     name: '测试二群',
        //     avatarUri : "https://avatars1.githubusercontent.com/u/15651299?s=64&v=4"
        // };
        // var req = await ins.findByOne({userName: "admin"}, 'user');
        // const data =  {
        //     conversationType: 2, // 1单聊 2 群聊
        //     userId: req.id, // 会话ID
        //     targetId: 157475469900053150, // 发送对象ID
        //     lastMsg: {
        //         avatar: 'https://avatars1.githubusercontent.com/u/15651299?s=64&v=4', // 会话头像
        //         content: "4564546544116",
        //         messageType: 1,
        //         unread: 0, // 未读消息
        //     }
        // }
        // var okInfo = await ins.insertDocuments(data, 13000, 'talkslist');
        // Assert.equal(true, okInfo.conversationType === 2)
        /**
         * 用户加入群组 删除
         */
        // var req = await ins.findByOne({ name: 'test01' }, 'create-group');
        // console.log(req)
        // var reqs = await ins.findByOne({userName: '小明'}, 'user'); 测试一群
        // {$push: { userIds: { userId: reqs.id, userName: reqs.userName, avatar: reqs.avatarUri } }}
        // update({ id: req.body.id }, {$pullAll: { userIds: [user.id] }}, 'create-group');
        // var okInfo = await ins.update(
        //     { id: "95dE1o-bqwktWExfeYUAg35P" },
        //     {$push: { userIds: ["1654sdfas4f65465"] }},
        //     'create-group'
        // ); { id: req.body.id }, {$pullAll: { userIds: [user.id] }}
        // var reqs = await ins.findByOne({userName: 'test001'}, 'user');
        // var okInfo = await ins.findOneAndUpdate({id: "YBCuA6LB49g9xgodcbaJh7tT"}, { $pull: { users: reqs._id}} , 'group');
        // Assert.equal(true, reqs.openId === 10000)
        // _Bewn1DRmRmssK_8VNMjOk18
        // "E0ehc2DNqOWOj4YGm90FoAFp" "95dE1o-bqwktWExfeYUAg35P" W_i3ol-SLAbevOS2uwk8tMtj
        // var okInfo = await ins.findByOne({id: "a5IcgbNOOLmeRxHtrY1-71Fk"}, 'Message');
        // var oks = await ins.findOneAndUpdate({id: okInfo.id}, { $inc: { unread: 1 } }, 'talkslist')
        // Assert.equal(true, oks.unread === 1)
        /**
         * 查询消息 5dea4ed2812f4b1f84dd46a2
         */ 
        // var okInfo = await ins.finds(
        //     {
        //         mainSession: '5dea4ed2812f4b1f84dd46a2', 
        //         messageType: { $in: [10, 12] }
        //     }, 
        //     {num: 1, size: 20},
        //     'senderUser',
        //     "Message"
        // );
        // console.log(okInfo);
        // // console.log(okInfo.length);
        // Assert.equal(true, okInfo[0].openId === 13000)
        /**
         * 删除群成员
         */
        // var req = await ins.findByOne({ name: '测试一群' }, 'create-group');
        // var reqs = await ins.findByOne({userName: '小华'}, 'user');
        // var okInfo = await ins.update({id: req.id}, {$pullAll: { userIds: [reqs.id] }}, 'create-group');
        // Assert.equal(true, okInfo.ok === 1)
        /**
         * 查询群
         */
        // var req = await ins.findByOne({userName: '小华'}, 'user');
        // var okInfo = await ins.findByOne({ name: '测试一群' }, 'create-group')
        // console.log(okInfo)
        // Assert.equal(true, okInfo.name === '测试一群')
        /**
         * 查询群
         */
        // var req = await ins.findByOne({_id: '5de4a3625e970bfecfc469e3'}, 'MessageSession');
        // // var okInfo = await ins.find({userIds: req.id}, 'create-group')
        // // var MessageMainSession = await ins.findByOne({userId: req.id, groupId: "WyNxCu4UmMOkosrmHOHmtGUK"}, 'MessageMainSession').populate('latestMessage')
        // // console.log(MessageMainSession)
        // console.log(req)
        // Assert.equal(true, req[0].openId === 13001)
        // 157422873500026750
        /**
         * 查询群
         */
        //  var okInfo = await ins.find({ openId:  11000}, 'create-group')
        //  console.log(okInfo)
        // Assert.equal(true, okInfo[0].openId === 11000)

        /**
         * 发送群消息
         */
        // content: {
        //     connect: String
        // },
        // conversationType: String,// 会话类型，参考会话类型说明
        // senderUserId: Number, // 发送ID
        // targetId: Number, // 接受群组ID
        // messageType: Number,
        // sendSession: {
        //     sid: Number, // 发送方会话ID
        //     title: String,// 发送方会话标题
        //     avatar: String//发送方会话头像
        // },
        // sendUser:{
        //     userName: String, // 发送用户名称
        //     avatarUri: String // 发送用户头像
        // }
        // var req = await ins.findByOne({userName: "小华"}, 'user');
        // var reqs = await ins.findByOne({ id: 157431695500024860 }, 'create-group');
        // var data = {
        //     content: {
        //         content: "你好"
        //     },
        //     conversationType: 1,
        //     messageType: 1,
        //     senderUserId: req.id,
        //     targetId: reqs.id,
        //     sendSession: {
        //         sid: req.id,
        //         title: '',
        //         avatar: req.avatarUri
        //     },
        //     sendUser: {
        //         name: reqs.name,
        //         avatarUri: reqs.avatarUri
        //     }
        // }
        // var okInfo = await ins.insertDocuments(data, 12000, 'message-list');
        // console.log(okInfo)
        // Assert.equal(true, okInfo.senderUserId === req.id)
        // 157431695500024860
        // var okInfo = await ins.findOne({id: 'dL8r6ftfwpat1nQAJjOMZlTn'}, 'users', 'group')
        // console.log(okInfo);
        // Assert.equal(true, okInfo.id === 'dL8r6ftfwpat1nQAJjOMZlTn')
        // var okInfo = await ins.finduserIds({ id: req.id }, 'create-group')
        // let data = {money: 1000000,total: 1000000000,Remarks: '测试'};
        // var okInfo = await ins.createUserAmount('S+uRRu5nVPTMrUXuzPcPymXIUV3out0BfebI6RNz5UaukOu63GU40Hi+fumah+MOxu1tI6HzFlFlXUmzFMG+bane5nQ+07O8lojKTiB/Qtg=',data);
        // var okInfo = await ins.findById(10002,'UserInformation');
        // var okInfo = await ins.findUserByAccount('admin','User');
        // var okInfo = await ins.UpdataUserInfo('z2deSbJOiEcWKqt20Zhhl6ub1MmRfgA1Pz/FzSjGRjy6KaarJHn7kEraUX8mhiZdDfPHLljcExNe7doYHK0ha/zTFZclUI6P',{phone:13588888888,QQ:666666,WeChat: 'test',Facebook: 'test',Skype: 'test',Remarks: '管理员测试'});
        // var okInfo = await ins.UpdataByUserIntegral('z2deSbJOiEcWKqt20Zhhl6ub1MmRfgA1Pz/FzSjGRjy6KaarJHn7kEraUX8mhiZdDfPHLljcExNe7doYHK0ha/zTFZclUI6P',{integral: 100});
        // Assert.equal(okInfo.id, 'z2deSbJOiEcWKqt20Zhhl6ub1MmRfgA1Pz/FzSjGRjy6KaarJHn7kEraUX8mhiZdDfPHLljcExNe7doYHK0ha/zTFZclUI6P')
    });
    it("Test Post Request", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
   });
});