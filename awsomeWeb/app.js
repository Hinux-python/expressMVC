var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs'); 
var session = require('express-session');

var router = require('./routes/route');
var config = require('./config/config').config
//var route = require('./routes/users');

var app = express();
app.engine('html', ejs.__express);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:config.session_secret
  // resave: true,
  // saveUninitialized: false,
  // cookie : {
  //   maxAge : config.maxAge, // 设置 session 的有效时间，单位毫秒
//},
}));
// custom middleware
app.use(require('./middlewares/auth').auth_user);

router(app)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
