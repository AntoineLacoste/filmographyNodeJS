var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    realisator: String,
    poster: String,
    releaseDate: Date,
    addDate: Date,
    summary: String,
    reviwes: [{type: Schema.Types.ObjectId, ref: 'Review'}]

});

module.exports = mongoose.model('Movie', movieSchema);