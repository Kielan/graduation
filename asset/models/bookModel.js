var mongoose = require('mongoose');

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
    },
    edited: {
	type: Boolean
    }
});

module.exports = mongoose.model('Book', favBookSchema);
