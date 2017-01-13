var router     = require('express').Router();
var bodyParser = require('body-parser');
var crypto     = require('crypto');
var db         = require('../config/db');

var parser     = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res) {
    res.render('addMovie.html', {});
});

router.get('/popular', function(req, res) {
});

module.exports = router;
