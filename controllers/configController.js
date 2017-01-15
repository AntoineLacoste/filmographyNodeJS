var router      = require('express').Router();
var bodyParser  = require('body-parser');
var db          = require('../config/db');
var checkLogin = require('../middlewares/checkLogin');
var Config = require('../model/configModel');

var parser      = bodyParser.urlencoded({extended: false});

router.get('/', checkLogin, function (req, res) {
    res.render('config.html', {perPage: perPage});
});

router.post('/', parser, function (req, res) {
    var perPage = req.body.perPage;

    Config.find({ 'parameter': 'perPage' }).then(function (config) {
        var configPerPage = config[0];

        configPerPage.value = perPage;
        global.perPage      = parseInt(perPage);

        configPerPage.save(function (err, config) {
            res.redirect('/');
        });
    });

});

module.exports = router;