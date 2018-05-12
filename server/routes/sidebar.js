var express = require('express');
var router = express.Router();

// Get Sidebar model
var Sidebar = require('../models/sidebar');

router.get('/', (req, res) => {
	console.log('Root');
	res.json('root');
});

/*
* Get edit Sidebar
*/
router.get('/edit-sidebar', function(req, res) {
	var id = '5a8d8a2267852ecef8fa95bd';

	Sidebar.findById(id, function(err, sidebar) {
		if (err) console.log(err);

		res.json(sidebar);
	});
});

/*
* POST Edit Sidebar
*/
router.post('/edit-sidebar', function(req, res) {
	var id = '5a8d8a2267852ecef8fa95bd';
	Sidebar.findById(id, function(err, sidebar) {
		if (err) console.log(err);

		sidebar.content = req.body.content;

		sidebar.save(err => {
			if (err) {
				console.log('Errore: ', err);
				res.json('errorInEdit');
			} else {
				res.json('ok');
			}
		});
	});
});

// Export
module.exports = router;
