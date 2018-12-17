//import modules
const express = require('express');
const foodRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const foodController = require('../controllers/food-entry-controller');
const foodHelper = require('../services/food-helper');

//food index get route
foodRoutes.get('/', authHelpers.loginRequired, foodController.index);

//food index post route - add new entry
foodRoutes.post('/',authHelpers.loginRequired, foodController.create);

//food add page route
foodRoutes.get('/add', authHelpers.loginRequired, (req,res) => {
	res.render('food-entries/food-add',{
		currentPage: 'food',
		results: null,
		username: req.user.username,
	});
});

//route for results after searching for item
foodRoutes.get('/add/:item', authHelpers.loginRequired, foodHelper.getItemsFromApi, (req,res) => {
	res.render('food-entries/food-results', {
		results: res.locals.results,
		currentPage: 'food',
		searchTerm: req.params.item,
		header: `Results for "${req.params.item}"`,
		username: req.user.username,
		}); 
	});

//route for adding item manually
foodRoutes.get('/add-manual', authHelpers.loginRequired, (req,res) => {
	res.render('food-entries/add-manual', {
		currentPage: null,
	})
})

//route for posting new item
foodRoutes.post('/add', authHelpers.loginRequired, (req,res) => {
	res.redirect(`/food/add/${req.body.item}`);
});

//edit route
foodRoutes.get('/:id/edit', authHelpers.loginRequired, foodController.edit);

//show specific item route
foodRoutes.get('/:id', authHelpers.loginRequired, foodController.show);

//update route
foodRoutes.put('/:id', authHelpers.loginRequired, foodController.update);

//remove item route
foodRoutes.delete('/:id', authHelpers.loginRequired, foodController.delete);

module.exports = foodRoutes;