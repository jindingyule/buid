const fs = require('fs');
const crypto = require('crypto');
const path = require("path")
// 从文件加载key:
// function loadKey(file) {
//   // key实际上就是PEM编码的字符串:
//   return fs.readFileSync(file, 'utf8');
// }
let prvKey = fs.readFileSync(path.resolve(__dirname,'./rsa-prv.pem'), 'utf8')
let pubKey = fs.readFileSync(path.resolve(__dirname,'./rsa-pub.pem'), 'utf8')
let message = '456sdfsdfsasfdsfdsfsdafsdsdgdfgdfagdfgasdgdsfsdfdsfsadfsdfsdfasddfds';
// 使用私钥加密:
// let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8', 'utf8'));
// console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));
// let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
// console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));
const encrypt = data => {
  return crypto.privateEncrypt(prvKey, Buffer.from(data, 'utf8'));
}
const decrypt = data => {
  return crypto.publicDecrypt(pubKey, data);
}
// let a = encrypt("?1546546")
// console.log(a)
// console.log(decrypt(a))
const md5 = data => {
  let md5=crypto.createHash("md5");
  md5.update(data);
  const str = md5.digest('hex');
  return str.toUpperCase()
}
// .toString('utf8')
// console.log('encrypted by private key: ' + encrypt.toString());
// const key = encrypt(message)
// console.log("RSA加密", key.toString('hex'))
// // console.log("RSA非对", key.toString())
// // console.log("RSA非对", key.toString('base64'))
// const jkey = decrypt(key)
// console.log("RSA非对称解密结果:%s",jkey);
// const prikey = prvKey.toString();
// const pubkey = pubKey.toString();
// var data = "我是信息内容摘要"
// var sign = crypto.createSign('RSA-SHA256');//创建签名算法
// sign.update(data);
// var sig = sign.sign(prikey, 'hex');//得到签名
// console.log('sig', sig)
// var verify = crypto.createVerify('RSA-SHA256');
// verify.update(data);
// var t= verify.verify(pubkey, sig, 'hex');
// // var t=verify.verify(otherkeys.pubKey, sig, 'hex');//用其它公钥校验无法通过！
// console.log("非对称签名校验结果结果：" + t);
module.exports = {
  encrypt, decrypt, 
  md5
};