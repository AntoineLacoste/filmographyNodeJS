var router     = require('express').Router();
var bodyParser = require('body-parser');
var crypto     = require('crypto');
var multer     = require('multer');
var db         = require('../config/db');

var parser     = bodyParser.urlencoded({extended: false});
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
}).single('picture');

router.get('/', function(req, res) {
});

router.get('/popular', function(req, res) {
});

module.exports = router;
