var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt-nodejs');
var userModel = require('./userModel');
var Schema    = mongoose.Schema;

var configSchema = new Schema({
    parameter: String,
    value: String
});

var configModel = mongoose.model('Config', configSchema);

configModel.find({}).then(
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

            configPerPage.save(function (err, configPerPage){
                configSalt.save(function (err, configSalt) {
                    global.salt    = configSalt.value;
                    global.perPage = parseInt(configPerPage.value);

                    var admin = new userModel({
                        login: 'admin',
                        password: bcrypt.hashSync('admin', salt)
                    });

                    admin.save(function (err, user) {
                        if(err) console.log(err);
                    });
                })
            });
        }
        else{
            global.perPage = parseInt(config[0].value);
            global.salt    = config[1].value;
        }
    },
    function (err) {
        console.log(err);
    });

module.exports = configModel;