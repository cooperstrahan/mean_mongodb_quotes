const quotes = require('../controllers/quotes.js');

module.exports = function(app) {
    app.get('/', function(req, res) {quotes.index(req, res);});
    app.post('/write', function(req, res) {quotes.write(req, res);});
    app.get('/quotes', function(req, res) {quotes.getquote(req, res);});
}
