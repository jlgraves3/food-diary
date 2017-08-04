const express = require('express');
const foodRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');


const foodController = require('../controllers/food-entry-controller');
const foodHelper = require('../services/food-helper');

foodRoutes.get('/', authHelpers.loginRequired, foodController.index);

foodRoutes.post('/',authHelpers.loginRequired, foodController.create);

foodRoutes.get('/add', authHelpers.loginRequired, (req,res) => {
	res.render('food-entries/food-add',{
		currentPage: 'food',
		results: null,
		username: req.user.username,
	});
});

foodRoutes.get('/add/:item', authHelpers.loginRequired, foodHelper.getItemsFromApi, (req,res) => {
	res.render('food-entries/food-results', {
		results: res.locals.results,
		currentPage: 'food',
		header: `Results for "${req.params.item}"`,
		username: req.user.username,
		}); 
	});

foodRoutes.get('/add-manual', authHelpers.loginRequired, (req,res) => {
	res.render('food-entries/add-manual', {
		currentPage: null,
	})
})

foodRoutes.post('/add', authHelpers.loginRequired, (req,res) => {
	res.redirect(`/food/add/${req.body.item}`);
});

foodRoutes.get('/:id/edit', authHelpers.loginRequired, foodController.edit);
foodRoutes.get('/:id', authHelpers.loginRequired, foodController.show);
foodRoutes.put('/:id', authHelpers.loginRequired, foodController.update);
foodRoutes.delete('/:id', authHelpers.loginRequired, foodController.delete);

module.exports = foodRoutes;