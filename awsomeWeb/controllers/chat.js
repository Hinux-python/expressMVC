var Message = require('../proxy/message');
var Promise = require('bluebird');
var crypto = require('crypto');
var config = require('../config/config').config

//聊天室
exports.showRoom = async function (req, res, next) {
    Message.getMessages(function(err,messages){
        if (err) {
            return next(err);
        }else{
            console.log(messages[0]);
            res.render('chat/chatRoom', { title: "chat room", messageList: messages });
        }
    })
}
exports.sendMessage = function (req, res) {

}

exports.recvMessage = function (req, res) {

}