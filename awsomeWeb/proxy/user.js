var User = require('../models').User;


exports.getUserByMail = function(email, callback){
    User.findOne({email:email},callback)
}
exports.newAndSave = function(name,email,pass,callback){
    var user = new User();
    user.username = name;
    user.password = pass;
    user.email = email;
    user.save(callback)
}