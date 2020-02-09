
var User = require('../proxy/user');
var Promise = require('bluebird');
var crypto = require('crypto');
var config = require('../config/config').config

//注册
exports.showSignup = function (req, res) {
    res.render('sign/signup', { title: "My Register Page" });
}

exports.signup = async function (req, res, next) {
    console.log(req.body)
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    User.getUserByMail(email, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            res.render('sign/signup', { error: '用户名或邮箱已被使用。', name: name, email: email });
            return;
        }
    })
    // md5 the pass
    pass = md5(pass);
    // create gavatar
    var avatar_url = 'http://www.gravatar.com/avatar/' + md5(email.toLowerCase()) + '?size=48';
    User.newAndSave(name, pass, email, avatar_url, function (err) {
        if (err) {
            return next(err);
        }
        // 发送激活邮件
        //   mail.sendActiveMail(email, md5(email + config.session_secret), name, email);
        //   res.render('sign/signup', {
        //     success: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
        //   });
    });

}

//登录
exports.showLogin = function (req, res) {
    res.render('sign/signin', { title: "My Login Page" });
}

exports.login = function (req, res, next) {
    var loginname = req.body.email;
    var pass = req.body.password;
    if (!loginname || !pass) {
        return res.render('sign/signin', { error: '信息不完整。' });
    }
    User.getUserByMail(loginname, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('sign/signin', { error: '这个用户不存在。' });
        }
        pass = md5(pass);
        if (pass !== user.password) {
            return res.render('sign/signin', { error: '密码错误。' });
        }
        if (user.status != 1) {
            // 账号异常
            return res.render('sign/signin', { error: '账号异常请联系管理员' });
        }
        // store session cookie
        gen_session(user, res);
        req.session.user = user;
        return res.redirect('chat');
    });
}
//注销
exports.signout = function (req, res, next) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/sign/signin');
};
exports.index = function (req, res) {
    res.render('/home');
}



// //注销
// exports.signout = function(req,res,next){

// }
function encrypt(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
  }
  
  function decrypt(str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
  
function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

//产生session
function gen_session(user, res) {
    var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.password + '\t' + user.email, config.session_secret);
    res.cookie(config.auth_cookie_name, auth_token, { path: '/', maxAge: 1000 * 60 * 60 * 24 * 30 }); //cookie 有效期30天
}