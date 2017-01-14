var mongoose = require('mongoose');
var dateformat = require('dateformat');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    realisator: String,
    poster: String,
    releaseDate: Date,
    addDate: { type: Date, default: Date.now },
    summary: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review', default: []}]
});

module.exports = mongoose.model('Movie', movieSchema);