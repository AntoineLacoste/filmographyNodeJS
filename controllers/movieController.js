var router      = require('express').Router();
var bodyParser  = require('body-parser');
var crypto      = require('crypto');
var db          = require('../config/db');
var movieModel  = require('../model/movieModel');
var reviewModel = require('../model/reviewModel');

var parser      = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res) {
    movieModel.find({}).then(function (movies) {
        res.render('movies.html', { movies: movies});
    },function (err) {
        console.log(err);
    });
});

router.get('/popular', function(req, res) {
    movieModel.find({}).sort({averageRate: -1}).populate('reviews').then(function (movies) {
        for(var i = 0; i < movies.length; i++){
            var sum = 0;
            for(var j = 0; j < movies[i].reviews; j++){
                sum += j.note;
            }
            movies.averageRate = sum / movies.reviews.length;
        }
        res.render('movies.html', { movies: movies});
    },function (err) {
        console.log(err);
    });
});

/********* movie routing ******/
router.get('/movie/:id', parser, function(req, res) {
    movieModel.findById(req.params.id).populate('reviews').then(function (movie) {
        res.render('detail.html', { movie: movie});
    },function (err) {
        console.log(err);
    });
});

router.post('/movie/:id', parser, function(req, res) {
    var idMovie = req.params.id;

    var review = new reviewModel({
        pseudo: req.body.pseudo,
        text: req.body.comment,
        note: req.body.note
    });

    console.log(review);
    review.save(function (err, review) {
        movieModel.findById(idMovie).populate('reviews').then(function (movie) {
            movie.reviews.push(review);

            movie.save(function (err,post) {
                res.redirect('/movie/' + idMovie);
            });
        },function (err) {
            console.log(err);
        });
    });
});

module.exports = router;