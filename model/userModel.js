var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
    login: String,
    password: String
});

var userModel = mongoose.model('User', userSchema);

userModel.find({ 'login': 'admin' }).then(function (user) {
    if (user.length == 0) {
        var admin = new userModel({
            login: 'admin',
            password: bcrypt.hashSync('admin', salt)
        });

        admin.save(function (err, user) {
            console.log(user);
        });
    }
});

module.exports = userModel;