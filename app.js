var express = require('express');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var app        = express();

global.salt = bcrypt.genSaltSync(10);

app.engine('.html', require('ejs').__express);

app.set('view engine', 'html');

app.use(session({
    secret: 'admin',
    cookie: {logged: false }
}));

app.use('/public', express.static(__dirname + '/public'));

app.use('/', require('./controllers'));

app.listen(1337, function() {
  console.log('App running');
});