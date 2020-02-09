var message = require('../proxy/message');


function chatready(io) {
    //在线用户
    var onlineUsers = {};
    //当前在线人数
    var onlineCount = 0;

    io.on('connection', function (socket) {
        // console.log('a user connected');


        // //监听新用户加入
        // socket.on('newUser', function (obj) {
        //     //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        //     socket.name = obj.username;


        //     //检查在线列表，如果不在里面就加入
        //     if (!onlineUsers.hasOwnProperty(obj.username)) {
        //         onlineUsers[obj.username] = obj.username;
        //         //在线人数+1
        //         onlineCount++;
        //     }


        //     //向所有客户端广播用户加入
        //     io.emit('newUser', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
        //     console.log(obj.username + '加入了聊天室');
        // });


        //监听用户退出
        // socket.on('disconnect', function () {
        //     //将退出的用户从在线列表中删除
        //     if (onlineUsers.hasOwnProperty(socket.name)) {
        //         //退出用户的信息
        //         var obj = { username: onlineUsers[socket.name] };


        //         //删除
        //         delete onlineUsers[socket.name];
        //         //在线人数-1
        //         onlineCount--;


        //         //向所有客户端广播用户退出
        //         io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
        //         console.log(obj.username + '退出了聊天室');
        //     }
        // });


        //监听用户发布聊天内容
        socket.on('new_message', function (obj) {
            obj.createTime = new Date();
            //向所有客户端广播发布的消息
            message.saveMessage(obj.content, obj.username, obj.email, obj.avatar_url, function (err, res) {
                if(err){
                    console.log(err)
                    console.log("err:数据库错误")
                }else{
                    io.emit('new_message',obj );
                }
                
            })
        });


    });
}
module.exports = chatready;
