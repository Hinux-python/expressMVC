exports.config = {
    //mongodb配置
    db: 'mongodb://127.0.0.1/node_club_dev',

    //redis缓存
    redis_host: '127.0.0.1',
    redis_port: '6379',
    redis_db:2,

    //session
    session_secret: 'xdq',
    auth_cookie_name:'hinux',
    maxAge: 1000 * 60 * 60 * 5,
};