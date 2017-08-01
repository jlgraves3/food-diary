const express = require('express');
const foodRoutes = express.Router();

const foodController = require('../controllers/food-entry-controller');
const foodHelper = require('../services/food-helper');

foodRoutes.get('/',foodController.index);

foodRoutes.post('/',foodController.create);

foodRoutes.get('/add', (req,res) => {
	res.render('food-entries/food-add');
});

foodRoutes.get('/:id/edit', foodController.edit);

foodRoutes.get('/:id',foodController.show);
foodRoutes.put('/:id',foodController.update);
foodRoutes.delete('/:id',foodController.delete);

module.exports = foodRoutes;