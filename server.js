
'use strict';
//module dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var morgan = require('morgan'); 
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var app = express()

var multipartMiddleware = multipart();

mongoose.connect('mongodb://localhost/thegraduate');

var graduateUserSchema = mongoose.Schema({
  _id: {
    type: String,
    lowercase: true,
    trim: true
  },
  name: {
    first: String,
    last: String
  },
  username: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

var favBookSchema = mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  author: {
    first: String,
    last: String,
 //   required: true
  },
  quote: {
    type: String,
    required: true,
    lowercase: true
  }
});

// view engine setup
app.engine('.hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
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

mongoose.model('User', graduateUserSchema);

mongoose.model('Book', favBookSchema);

//routes
app.get('/', function(req, res) {
  res.render('index', {
    title: 'GraduateLogin'
  });
})

app.post('/test', function(req, res) {
    console.log('redwedding');
});

//create new account
app.post('/api/signup', multipartMiddleware, function(req, res) {
    console.log('hitsignup route');
    console.log(req.params);
    console.log(req.body);
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    res.send('got a post request');

});

app.get('/signup', function (req, res) {
    
})

app.post('/login', function(req, res) {
    //validate
    var email = req.param('email');
    var password = req.param('password');

    if (!(email && password)) {
	return invalid();
    }

    email = email.toLowerCase();

    // query mongodb
    User.findById(email, function (err, user) {
      if (err) return next(err);

      if (!user) {
        return invalid();
      }

      // validate password
      if (user.hash != hash(pass, user.salt)) {
        return invalid();
      }

      req.session.isLoggedIn = true;
      req.session.user = email;
      res.redirect('/');
    })
})




var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)
})


function invalid() {
    console.log('not valid dude');
}
