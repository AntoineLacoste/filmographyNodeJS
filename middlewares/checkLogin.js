var checkLogin = function (req, res, next) {
    console.log(sess);
    if (sess.logged) {
        next();
    }
    res.redirect('/admin/login');
};

module.exports = checkLogin;