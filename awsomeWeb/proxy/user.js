var User = require('../models').User;


exports.getUserByMail = function(email, callback){
    User.findOne({email:email},callback)
}
exports.newAndSave = function (name, pass, email, avatar_url, callback) {
    var user = new User();
    user.username = name;
    user.password = pass;
    user.email = email;
    user.avatar_url = avatar_url;
    user.save(callback)
}