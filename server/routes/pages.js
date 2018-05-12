var express = require('express');
var router = express.Router();

// Get page model
var Page = require('../models/page');

/*
* Get all pages
*/
router.get('/', function(req, res) {
	Page.find({}, function(err, pages) {
		if (err) console.log(err);
		res.json(pages);
	});
});

/*
* Get a page
*/
router.get('/:slug', function(req, res) {
	var slug = req.params.slug;

	Page.findOne({ slug: slug }, function(err, page) {
		if (err) {
			console.log(err);
		}
		res.json(page);
	});
});

/*
* Post Add Page
*/
router.post('/add-page', function(req, res) {
	var title = req.body.title;
	var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
	var content = req.body.content;
	var hasSidebar = req.body.hasSidebar;
	var sidebar = hasSidebar ? 'yes' : 'no';

	Page.findOne({ slug: slug }, function(err, page) {
		if (err) console.log(err);
		if (page) {
			res.json('pageExists');
		} else {
			var page = new Page({
				title: title,
				slug: slug,
				content: content,
				sidebar: sidebar
			});
			page.save(err => {
				if (err) console.log('Error in saving page: ', err);
				res.json('ok');
			});
		}
	});
});

/*
* Get Edit Page
*/
router.get('/edit-page/:id', function(req, res) {
	var id = req.params.id;

	Page.findOne({ _id: id }, function(err, page) {
		if (err) {
			console.log(err);
		}
		res.json(page);
	});
});

/*
* Post Edit Page
*/
router.post('/edit-page/:id', function(req, res) {
	var id = req.params.id;
	var title = req.body.title;
	var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
	var content = req.body.content;
	var hasSidebar = req.body.hasSidebar;
	var sidebar = hasSidebar ? 'yes' : 'no';

	Page.findOne({ slug: slug, _id: { $ne: id } }, function(e, p) {
		if (e) console.log(e);

		if (p) {
			res.json('pageExists');
		} else {
			Page.findOne({ _id: id }, function(err, page) {
				if (err) console.log(err);

				page.title = title;
				page.slug = slug;
				page.content = content;
				page.sidebar = sidebar;

				page.save(err => {
					if (err) {
						console.log('Error in saving page: ', err);
						res.json('errorInEdit');
					} else {
						res.json('ok');
					}
				});
			});
		}
	});
});

/*
* GET Delete Page
*/
router.get('/delete-page/:id', function(req, res) {
	var id = req.params.id;

	Page.findByIdAndRemove(id, function(err) {
		if (err) {
			res.json('errorInDelete');
			console.log(err);
		} else {
			res.json('pageDeleted');
		}
	});
});

// Export
module.exports = router;
