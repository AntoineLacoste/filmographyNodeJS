var router      = require('express').Router();
var bodyParser  = require('body-parser');
var db          = require('../config/db');
var checkLogin = require('../middlewares/checkLogin');
var Config = require('../model/configModel');

var parser      = bodyParser.urlencoded({extended: false});

router.get('/', checkLogin, function (req, res) {
    res.render('config.html', {salt: salt, perPage: perPage});
});

router.post('/', parser, function (req, res) {
    
    var newSalt = req.body.salt;
    var newPerPage = req.body.perPage;

    if(newSalt.length != 0) {
        Config.find({ 'parameter': 'salt' }).then(function (configSalt) {
            if(configSalt.length == 0) {             
                Config({
                    parameter: 'salt',
                    value: newSalt
                }).save(function (err, u) {});
            } else {
                configSalt.value.push(newSalt);
            }
        });
    }
    if(newPerPage.length != 0) {
        Config.find({ 'parameter': 'perPage' }).then(function (configPerPage) {
            if(configPerPage.length == 0) {             
                Config({
                    parameter: 'perPage',
                    value: newPerPage
                }).save(function (err, u) {});
            } else {
                configPerPage.value.push(newPerPage);
            }
        });
    }
   
    res.redirect('/');
    
});

module.exports = router;