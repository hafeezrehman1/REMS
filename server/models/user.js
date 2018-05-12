var mongoose = require('mongoose');

// User Schema
var UserSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	email: { type: String, unique: true },
	password: { type: String }
});

var User = (module.exports = mongoose.model('User', UserSchema));
