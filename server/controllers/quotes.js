const mongoose = require('mongoose');

require('../models/quote.js');
const Quote = mongoose.model('Quote');
module.exports = {
    index: function(req, res) {
        res.render('index');
    },
    write: function(req, res) {
        var quote = new Quote({name: req.body.name, quote: req.body.quote});
        quote.save(function(err) {
            if(err) {
                console.log('Something went wrong adding a new quote');
                for(var key in err.errors){
                    req.flash('entry', err.errors[key].message);
                }
                res.redirect('/');
            } else {
                console.log('Successfully added quote!');
                res.redirect('/quotes');
            }
        });
    },
    getquote: function(req, res) {
        var table = Quote.find({}, function(err, quotes) {
            if(err) {
                console.log('Something went wrong getting the quotes');
                res.render('/');
            } else {
                console.log('Successfully retrieved the quotes');
                res.render('quote', {quote_list: quotes});
            }
        });
    }
};