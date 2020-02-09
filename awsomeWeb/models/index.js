var mongoose = require('mongoose')
var config = require('../config/config').config

mongoose.connect(config.db, {
  poolSize: 20,
  // useCreateIndex: true,
  useNewUrlParser: true
}, function (err) {
  if (err) {
    console.log(err)
    logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

//models
require('./user');
require('./message');
exports.User = mongoose.model('User');
exports.Message = mongoose.model('Message');