var router     = require('express').Router();
var fs         = require('fs');
var multer     = require('multer');
var crypto     = require('crypto');
var mime       = require('mime');
var db = require('../config/db');
var bodyParser = require('body-parser');
var User = require('../model/userModel');
var bcrypt = require('bcrypt-nodejs');
var movieModel = require('../model/movieModel');

var storage    = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(err, raw.toString('hex') + '.' + mime.extension(file.mimetype));
        });
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file.mimetype.split('/')[0]);
        if(file.mimetype.split('/')[0] == 'image') {
            cb(null, true);
        }
        else {
            cb(new Error('Wrong file type'));
        }
    }
}).single('poster');

router.get('/login', function (req, res) {
    res.render('login.html', {});
});

var parser = bodyParser.urlencoded({ extended: false });

router.post('/login', parser, function (req, res) {
    var login = req.body.login;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    var u = User({
        login: login,
        password: hash
    }).save(function (err, comment) {
        res.redirect('/');
    });
});

router.get('/config', function(req, res) {
});

/**************** Add movie routing******/
router.get('/addMovie', function(req, res) {
    res.render('addMovie.html', {});
});

router.post('/addMovie', function (req, res) {
    upload(req, res, function (err) {
        if(err){
            return res.render('addMovie.html', {error: err});
        }

        var title       = req.body.title;
        var realisator  = req.body.realisator;
        var releaseDate = new Date(req.body.releaseDate);
        var summary     = req.body.summary;

        var movie = new movieModel({
            title: title,
            realisator: realisator,
            poster: req.file.path,
            releaseDate: releaseDate,
            summary: summary,
        });

        console.log(movie);
        movie.save(function (err,post) {
            res.redirect('/');
        });

    });
});
module.exports = router;