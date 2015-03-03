'use strict';
//module dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var ejs = require('ejs');
var crypto = require('crypto');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./asset/routes/routes.js');
var app = express();




mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/thegraduate');



// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', '.html');
app.set('views', path.join(__dirname, 'views'));

//not good for production but good enough for development and mantaining session
//data
//app.use(express.cookieParser());
app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));
app.use(bodyParser());
app.use(morgan('dev'));

//making my own middleware to expose session information
//to the view for login data
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
})

app.use(express.static(path.join(__dirname, 'asset')));


//routes
routes(app);


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
})


