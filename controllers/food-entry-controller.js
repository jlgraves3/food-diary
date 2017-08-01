const foodEntry  = require('../models/food-entries.js');
const moment = require('moment');
const foodController = {};

foodController.index = (req,res) => {
	var today = moment().format('dddd, MMMM Do YYYY');
	console.log(today);
	var parsedDate = moment().format('YYYY-MM-DD');
	console.log(parsedDate);
	foodEntry.findAll(parsedDate)
	.then(entries => {
		res.render('food-entries/food-index', {
			data: entries,
			date: today,
		});
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
} 

foodController.show = (req,res) => {
	foodEntry.findById(req.params.id)
	.then(entry => {
		res.render('food-entries/food-single', {
			data: entry,
		});
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
} 

foodController.create = (req,res) => {
	foodEntry.create({
		name: req.body.name,
		date: moment().format('YYYY-MM-DD'),
		time: req.body.time,
		cals: req.body.cals,
		details: req.body.details
	}).then(() => {
		res.redirect('/food');
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

foodController.edit = (req,res) => {
	console.log('controller edit');
	foodEntry.findById(req.params.id)
	.then(entry => {
		res.render('food-entries/food-update', {
			data: entry,
		});
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

foodController.update = (req,res) => {
	console.log('controller update');
	foodEntry.update({
		name: req.body.name,
		date: req.body.date,
		time: req.body.time,
		cals: req.body.cals,
		details: req.body.details
	}, req.params.id)
	.then(entry => {
		res.redirect(`/food/`);
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

foodController.delete = (req,res) => {
	foodEntry.delete(req.params.id)
	.then(() =>
		{res.redirect('/food/');}
	).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}


module.exports = foodController;