var mongoose= require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose')

// DATABASE SETUP

var nasaSchema = mongoose.Schema({
    username : String,
    password : String
})
/* passport local mongoose plugin */

nasaSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model('Nasa', nasaSchema);