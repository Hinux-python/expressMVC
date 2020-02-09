var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    createTime: { type: Date, default: new Date() },
    avatar_url: { type: String },
    content: { type: String }
})

mongoose.model('Message', MessageSchema)