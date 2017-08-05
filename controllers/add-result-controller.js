const foodEntry = require('../models/food-entries');

const resultController = {};

//gets data from search result item in req body, render in form
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

