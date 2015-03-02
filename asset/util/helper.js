var crypto = require('crypto');


exports.invalid = function () {
    console.log('not valid dude');
};

exports.hash = function (password, salt) {
    var hash = crypto.createHash('sha512');
    hash.update(password, 'utf8');
    hash.update(salt, 'utf8');
    return hash.digest('base64');
};

