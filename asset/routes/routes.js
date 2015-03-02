var multipart = require('connect-multiparty');
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
        title: 'GraduateLogin'
    });
})

//create new object
app.post('/api/newbook', multipartMiddleware, function(req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var quote = req.body.quote;

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
            return res.render('signup.html', {
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
                req.session.isLoggedIn = true;
                req.session.user = email;
                console.log('created user: %s', email);
                return res.redirect('/');
            })
        })
    })
});

app.get('/signup', function(req, res) {

})

app.post('/api/login', multipartMiddleware, function(req, res) {
    //validate
    var email = req.body.email;
    var password = req.body.password;

    if (!(email && password)) {
        return invalid();
    }

    email = email.toLowerCase();

    // query mongodb
    User.findById(email, function(err, user) {
        if (err) return next(err);

        if (!user) {
            return invalid();
        }

        // validate password
        if (user.hash != hash(password, user.salt)) {
            return invalid();
        }

        req.session.isLoggedIn = true;
        req.session.user = email;
        res.redirect('/');
    })
})
}//module bracket
