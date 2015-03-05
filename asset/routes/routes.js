var multipart = require('connect-multiparty');
var sessions = require('client-sessions');
var mongoose = require('mongoose');
var User = require('../models/userModel.js');
var Book = require('../models/bookModel.js');
var hash = require('../util/helper.js').hash;
var invalid = require('../util/helper.js').invalid;
var crypto = require('crypto');
var multipartMiddleware = multipart();

//routes
module.exports = function (app) {
 
app.get('/', function(req, res) {
    res.render('index', {
        title: 'GraduateLogin',
//	user: req.sessions.user.username
    });
})

//create new object
app.post('/api/newbook', multipartMiddleware, function(req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var quote = req.body.quote;
    //var creator = 

    var book = {
	title: title,
	author: author,
	quote: quote
    }

    Book.create(book, function(err, newBook) {
	if (err) {
            if (err instanceof mongoose.Error.ValidationError) {
		console.log(err);
                    return invalid();	
            }
            return next(err);
	}

	//book created successfully
	console.log('created book: %s', title);
        return res.redirect('/');
    })
})

//create new account
app.post('/api/signup', multipartMiddleware, function(req, res) {
    console.log('hitsignup route');
    console.log(req.body);
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;


    if (!(email && password)) {
	console.log('what');
        return invalid();
    }

    User.findById(email, function(err, user) {
        if (err) return next(err);

        if (user) {
	    console.log('property user taken')
            return res.render('../asset/signup.html', {
                exists: true
            });
        }

        crypto.randomBytes(16, function(err, bytes) {
            if (err) return next(err);

            var user = {
                _id: email,
		email: email,
		username: username,
		password: password
            };
	    
            user.salt = bytes.toString('utf8');
            user.hash = hash(password, user.salt);

            User.create(user, function(err, newUser) {
                if (err) {
                    if (err instanceof mongoose.Error.ValidationError) {
			console.log(err);
                        return invalid();	
                    }
                    return next(err);
                }

                // user created successfully
		//now set session properly
		    req.sessions.user = user;
		    req.user = user;
		res.locals.user = user;
		console.log(req.sessions.user);
		console.log(req.user);
		console.log(res.locals.user);

                console.log('created user: %s', email);
                return res.redirect('/');
            })
        })
    })
});

app.get('/signup', function(req, res) {
    return res.redirect('/');
})

app.post('/api/login', multipartMiddleware, function(req, res) {
    //validate
    var email = req.body.email;
    var password = req.body.password;

    if (!(email && password)) {
	console.log('no email or maybe password');
        return invalid();
    }

    email = email.toLowerCase();

    // query mongodb
    User.findById(email, function(err, user) {
        if (err) return next(err);

        if (!user) {
	    console.log('no user info yet you should signup');
            return invalid();
        }

        // validate password
        if (user.hash != hash(password, user.salt)) {
            return invalid();
        }

        req.sessions.isLoggedIn = true;
        req.sessions.user = email;
        res.redirect('/');
    })
})
//place ensureAuthorized inside router requests before callback
    function ensureAuthorized(req, res, next) {
	var role;
	if(!req.user) role = userRoles.public;
	else          role = req.user.role;
	var accessLevel = _.findWhere(routes, { path: req.route.path, httpMethod: req.route.stack[0].method.toUpperCase() }).accessLevel || accessLevels.public;

	if(!(accessLevel.bitMask & role.bitMask)) return res.send(403);
	return next();
}
}//module bracket
