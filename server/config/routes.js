const mongoose = require('mongoose'),
    Quote = mongoose.model('Quote');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    })
    
    app.post('/write', function(req, res) {
        console.log('POST DATA', req.body);
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
        })
        
    })
    
    app.get('/quotes', function(req, res) {
        var table = Quote.find({}, function(err, quotes) {
            if(err) {
                console.log('Something went wrong getting the quotes');
                res.render('/');
            } else {
                console.log('Successfully retrieved the quotes');
                res.render('quote', {quote_list: quotes});
            }
        });
    });
}
