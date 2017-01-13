var router    = require('express').Router();
var fs        = require('fs');

router.get('/login', function (req, res) {
    res.render('login.html', {});
});

router.get('/config', function(req, res) {
});

module.exports = router;