var checkLogin = function (req, res, next) {
    if (sess.logged) {
        next();
    }
    else {
        res.redirect('/admin/login');
    }
};

module.exports = checkLogin;