const express = require('express');
const foodRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');


const foodController = require('../controllers/food-entry-controller');
const foodHelper = require('../services/food-helper');

foodRoutes.get('/', authHelpers.loginRequired, foodController.index);

foodRoutes.post('/',authHelpers.loginRequired, foodController.create);

foodRoutes.get('/add', authHelpers.loginRequired, (req,res) => {
	res.render('food-entries/food-add',{
		currentPage: 'food-add',
		results: null,
	});
});
/*
foodRoutes.get('/add/:item', authHelpers.loginRequired, foodHelper.getItemsFromApi, (req,res) => {
	res.render('food-entries/food-results',
		{results: res.locals.results,
		 currentPage: 'food-results'}); 
}); */

foodRoutes.get('/add/:item', authHelpers.loginRequired, foodHelper.getItemsFromApi, (req,res) => {
	/*res.render('food-entries/food-results',
		{results: res.locals.results,
		 currentPage: 'food-results'}); */
	res.render('food-entries/food-add', {
		results: res.locals.results,
		currentPage: 'food-add'
		}); 
	});

//route for specific day
foodRoutes.get('/:date', authHelpers.loginRequired, foodController.indexOld);

foodRoutes.post('/add', authHelpers.loginRequired, (req,res) => {
	res.redirect(`/food/add/${req.body.item}`);
});

foodRoutes.get('/archive', foodController.archive);
foodRoutes.get('/:id/edit', foodController.edit);
foodRoutes.get('/:id',foodController.show);
foodRoutes.put('/:id',foodController.update);
foodRoutes.delete('/:id',foodController.delete);

module.exports = foodRoutes;