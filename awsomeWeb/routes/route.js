var login = require('../middlewares/auth')
var sign = require('../controllers/sign')


module.exports = function(app){
    //home
    app.get('/home', sign.index);
    app.get('/', sign.showLogin);
    
    // sign up, login, logout
    app.get('/signup', sign.showSignup);
    app.post('/signup', sign.signup);

    //app.get('/signout', sign.signout);

    app.get('/signin', sign.showLogin);
    app.post('/signin', sign.login);
}