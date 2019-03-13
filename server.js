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

app.listen(port, function() {});

require('./server/config/routes.js')(app);