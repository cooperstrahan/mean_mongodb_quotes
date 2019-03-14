var mongoose = require('mongoose');
module.exports = { 
    mongoose: mongoose.connect('mongodb://localhost/quote_database', {useNewUrlParser: true})
}