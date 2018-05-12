var express = require('express');
var router = express.Router();

// Get User model
var User = require('../models/user');

/*
* Register User
*/
router.post('/register', function(req, res) {
	User.findOne(
		{
			$or: [{ username: req.body.username }, { email: req.body.email }]
		},
		function(err, users) {
			if (err) console.log(err);
			if (users) {
				if (users.username == req.body.username) {
					// username already exists
					res.json('usernameExists');
				} else if (users.email == req.body.email) {
					res.json('emailExists');
				}
			} else {
				// Register the new user
				var user = new User({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email
				});
				user.save(err => {
					if (err) {
						console.log('Error in saving to DB: ', err);
					} else {
						res.json('userRegistered');
					}
				});
			}
		}
	);
});

/*
* User Login
*/
router.post('/login', function(req, res) {
	User.findOne({ username: req.body.username }, function(err, user) {
		if (err) console.log(err);
		if (user) {
			if (user.username == req.body.username) {
				// username exists
				// Check for password
				if (user.password == req.body.password) {
					// Username and password matched
					res.json(user.username);
				} else {
					res.json('wrongPassword');
				}
			} else {
				res.json('userNotExists');
			}
		} else {
			// Username doesnot exists, send message 'userNotExists'
			res.json('userNotExists');
		}
	});
});

/*
* Get Username from ID
*/
router.get('/name/:id', function(req, res) {
	User.findOne({ _id: req.params.id }, function(err, user) {
		if (err) console.log(err);
		if (user) {
			res.json(user.username);
		} else {
			res.json('wrongId');
		}
	});
});

// Export
module.exports = router;
