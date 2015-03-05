var mongoose = require('mongoose');

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
    },
    permissions: {
	view: {
	    type: Boolean
	},
	trash: {
	    type: Boolean
	}
    }
});

module.exports = mongoose.model('User', graduateUserSchema);
