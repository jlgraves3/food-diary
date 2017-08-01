const foodEntry  = require('../models/food-entries.js');
const moment = require('moment');
const foodController = {};


const stringDate = moment().format('dddd, MMMM Do YYYY');
const parsedDate = moment().format('YYYY-MM-DD');

foodController.index = (req,res) => {
	foodEntry.dailyCals(parsedDate,req.user.id)
	.then((total) =>
		foodEntry.findAll(parsedDate,req.user.id)
		.then(entries => {
			res.render('food-entries/food-index', {
				data: entries,
				date: stringDate,
				totalCals: total.sum
			});
		}).catch(err => {
	      console.log(err);
	      res.status(500).json(err);
	    }));
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
	},req.user.id).then(() => {
		res.redirect('/food');
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

foodController.edit = (req,res) => {
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
	foodEntry.update({
		name: req.body.name,
		date: moment().format('YYYY-MM-DD'),
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

foodController.archive = (req,res) => {
	res.render('food-entries/archive', {});
}


module.exports = foodController;