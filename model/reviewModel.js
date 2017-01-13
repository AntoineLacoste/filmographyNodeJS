var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    pseudo: String,
    text: String,
    note: String
});

module.exports = mongoose.model('Review', reviewSchema);