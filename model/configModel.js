var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

var configSchema = new Schema({
    parameter: String,
    value: String
});

var configModel = mongoose.model('Config', configSchema);

configModel.find({'parameter' : 'salt'}).then(
    function(config){
        if(config.length == 0){
            var configPerPage = configModel({
               parameter : 'perPage',
               value: '5'
            });

            var configSalt = configModel({
                parameter : 'salt',
                value: bcrypt.genSaltSync(10)
            });

            configPerPage.save(function (err, config){
               configSalt.save(function (err, configSalt) {
                   global.salt = parseInt(configSalt.value);
               })
            });
        }
        else{
            global.salt = config[0].value;
        }
    },
    function (err) {
        console.log(err);
    });

module.exports = configModel;