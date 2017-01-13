var checkLogin = function (req, res, next) {
    console.log(req.session);
    if (req.session.cookie.logged) {
        
        next();
    }

    res.redirect('/admin/login');
}

module.exports = checkLogin;