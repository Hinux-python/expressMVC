
var User = require('../proxy/user')
var Promise = require('bluebird')
var crypto = require('crypto')

//注册
exports.showSignup = function (req, res) {
    res.render('sign/signup',{ title: "My Register Page" });
}

exports.signup = async function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    User.getUserByMail(email,function(err,user){
        if (err) {
            return next(err);
          }
          if (user) {
            res.render('sign/signup', {error: '用户名或邮箱已被使用。', name: name, email: email});
            return;
          }
    })
    // var  res = await Promise.fromCallback(User.getUserByMail(email,res=>cb))
    // console.log(res)
        // md5 the pass
    pass = md5(pass);
    // create gavatar
    var avatar_url = 'http://www.gravatar.com/avatar/' + md5(email.toLowerCase()) + '?size=48';
    User.newAndSave(name, pass, email, avatar_url, function (err) {
        if (err) {
            return next(err);
          }
        console.log('sucessful')
          // 发送激活邮件
        //   mail.sendActiveMail(email, md5(email + config.session_secret), name, email);
        //   res.render('sign/signup', {
        //     success: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
        //   });
    });
    
}
function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
  }
//登录
exports.showLogin = function(req,res){
    res.render('sign/signin',{ title: "My Login Page" });
}

// exports.login = function(req,res,next){

// }
// //注销
// exports.signout = function(req,res,next){

// }