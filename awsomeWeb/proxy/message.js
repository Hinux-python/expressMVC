var Message = require('../models').Message;


exports.getMessages = function(callback){
    Message.find({},callback);
}
exports.saveMessage = function(content,name,email,avatar_url,callback){
    var message = new Message();
    message.username = name;
    message.email = email;
    message.content = content;
    message.avatar_url = avatar_url;
    message.save(callback);
}
