

exports.auth_user = function (req, res, next) {
    var path =req.path
    console.log(req.path)
    if (req.session.user || req.path=='/' || req.path=='/signin'|| req.path=='/signup') {
        //res.locals('current_user', req.session.user);
        return next();
    } else {
        return res.send("<script>alert('您还没有登录，请先登录');location.href='/signin'</script>");

    }
};