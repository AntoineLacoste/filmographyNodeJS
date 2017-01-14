var express     = require('express');
var session     = require('express-session');
var bcrypt      = require('bcrypt-nodejs');
var app         = express();
var configModel = require('./model/configModel');

global.page = 1;
global.sess = {};

app.engine('.html', require('ejs').__express);

app.set('view engine', 'html');

app.use(session({secret: 'movieApp'}));

app.use('/public', express.static(__dirname + '/public'));

app.use('/', require('./controllers'));

app.listen(1337, function() {
  console.log('App running');
});