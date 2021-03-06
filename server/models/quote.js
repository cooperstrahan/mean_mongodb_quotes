const mongoose = require('mongoose');
require('../config/mongoose.js');

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    quote: {type: String, required: true, minlength: 2, maxlength: 140}
}, {timestamps: true});
module.exports = { Quote: mongoose.model('Quote', QuoteSchema) }
