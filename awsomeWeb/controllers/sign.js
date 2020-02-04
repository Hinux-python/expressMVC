
var User = require('../proxy/user')
//注册
exports.showSignup = function (req, res) {
    res.render('sign/signup',{ title: "My Register Page" });
}

exports.signup = function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.bodu.password;
    User.getUsersByQuery({'$or': [{'loginname': loginname}, {'email': email}]}, {}, function (err, users) {
        if (err) {
          return next(err);
        }
        if (users.length > 0) {
          res.render('sign/signup', {error: '用户名或邮箱已被使用。', name: name, email: email});
          return;
        }
    
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