const moment = require('moment');
const foodEntry = require('../models/food-entries');

const resultController = {};

resultController.resultForm = (req,res) => {
	res.render('food-entries/food-result-add', {
		name: req.body.name,
		cals: req.body.cals,
		details: req.body.details,
		currentPage: null
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});	
}

 module.exports = resultController;

