var router     = require('express').Router();
var fs         = require('fs');
var multer     = require('multer');
var crypto     = require('crypto');
var mime       = require('mime');
var db = require('../config/db');
var session = require('express-session');
var bodyParser = require('body-parser');
var User = require('../model/userModel');
var bcrypt = require('bcrypt-nodejs');
var checkLogin = require('../middlewares/checkLogin');
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
    var hash = bcrypt.hashSync(req.body.password, salt);

    User.find({ 'login': 'admin' }).then(function (user) {
        console.log('toto' + user);
        if (user.password == 'admin') {
            console.log('true1');
            req.session.cookie.logged = true;
        }
        console.log(hash);
        if (user.password == hash) {
            res.redirect('/');
            console.log(req.session.cookie.logged + 'existe 1');
        } else {
            res.redirect('/admin/login');
            console.log(req.session.cookie.logged + 'existe 2');
        }

    }, function (err) {
        console.log(err)

        var u = User({
            login: login,
            password: hash
        }).save(function (err) {
            if (u.admin == 'admin' && u.password == 'admin') {
                console.log('true2');
                req.session.cookie.logged = true; 
            }
            console.log(req.session.cookie.logged + 'existe pas 2');
            res.redirect('/');
        });
    });


});

router.get('/config', function(req, res) {
});

/**************** Add movie routing******/
//TODO add middleware
router.get('/addMovie', function(req, res) {//, checkLogin, function(req, res) {
    res.render('addMovie.html', {});
});

router.post('/addMovie', function(req, res) {//, checkLogin, function (req, res) {
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