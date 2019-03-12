var express = require('express');
var app = express();
var bp = require('body-parser');
const port = 1234;
app.use(bp.urlencoded({extended: true}));
var path = require('path');
const flash = require('express-flash');
const session = require('express-session')
app.use(flash());
app.use(express.static(path.join(__dirname, './static')));
app.use(session({
    secret: 'notAverySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000},
    count: 0
}))
app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quote_database', {useNewUrlParser: true});

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    quote: {type: String, required: true, minlength: 2, maxlength: 140}
}, {timestamps: true});
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');
mongoose.Promise = global.Promise;

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
    })
})

app.listen(port, function() {

})