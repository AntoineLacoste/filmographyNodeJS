var router      = require('express').Router();
var bodyParser  = require('body-parser');
var crypto      = require('crypto');
var db          = require('../config/db');
var movieModel  = require('../model/movieModel');
var reviewModel = require('../model/reviewModel');

var parser      = bodyParser.urlencoded({extended: false});

router.get('/', parser,  function(req, res) {
    if(req.param('page')){
        page = req.param('page');
    }
    movieModel.find({}).sort({releaseDate: -1}).limit(perPage).skip((page - 1) * perPage).populate('reviews').then(function (movies) {
        for(var i = 0; i < movies.length; i++){
            console.log(movies[i].reviews.length);
            var sum = 0;
            for(var j = 0; j < movies[i].reviews.length; j++){
                sum += movies[i].reviews[j].note;
            }

            if(sum > 0) {
                movies[i].averageRate = sum / movies[i].reviews.length;
            }
            else{
                movies[i].averageRate = 0;
            }
        }
        res.render('movies.html', { movies: movies});
    },function (err) {
        console.log(err);
    });
});

router.get('/popular', function(req, res) {
    movieModel.find({}).populate('reviews').then(function (movies) {
        for(var i = 0; i < movies.length; i++){
            console.log(movies[i].reviews.length);
            var sum = 0;
            for(var j = 0; j < movies[i].reviews.length; j++){
                sum += movies[i].reviews[j].note;
            }

            if(sum > 0) {
                movies[i].averageRate = sum / movies[i].reviews.length;
            }
            else{
                movies[i].averageRate = 0;
            }
        }
        movies.sort(function (movieOne, movieTwo) {
            if (movieOne.averageRate > movieTwo.averageRate)
                return -1;
            if (movieOne.averageRate < movieTwo.averageRate)
                return 1;
            return 0;
        });

        res.render('movies.html', { movies: movies.slice(0, 3)});
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