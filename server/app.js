var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var config = require('./config/db');

//Connect to DB
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
	console.log('## Connected to MongoDB');
});

// Init app
var app = express();

// Prettify JSON
app.set('json spaces', 40);

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

// Set Routes
var pages = require('./routes/pages');
var users = require('./routes/users');
var sidebar = require('./routes/sidebar');

app.use('/pages', pages);
app.use('/users', users);
app.use('/sidebar', sidebar);

// Start the server
var port = process.env.PORT || 3000;
app.listen(port, function(err) {
	if (err) {
		console.log('## Error while initiating Server @' + port);
	} else {
		console.log('## Server listening on port: ' + port);
	}
});
