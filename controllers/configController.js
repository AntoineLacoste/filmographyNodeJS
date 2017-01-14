var router      = require('express').Router();
var bodyParser  = require('body-parser');
var db          = require('../config/db');
var configModel = require('../model/configModel');

var parser      = bodyParser.urlencoded({extended: false});

router.get('/', checkLogin,  function(req, res) {
    res.render('config.html', {});
});

module.exports = router;