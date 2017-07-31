const express = require('express');
const foodRoutes = express.Router();

const foodController = require('../controllers/food-entry-controller');

foodRoutes.get('/',foodController.index);
foodRoutes.post('/',foodController.create);

foodRoutes.get('/add', (req,res) => {
	res.send({
		message: add
	});
});

foodRoutes.get('/:id',foodController.show);
//foodRoutes.put('/:id',foodController.update);
foodRoutes.delete('/:id',foodController.delete);

module.exports = foodRoutes;