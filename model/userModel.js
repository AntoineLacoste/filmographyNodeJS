var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    login: String,
    password: String
});

module.exports = mongoose.model('Review', reviewSchema);