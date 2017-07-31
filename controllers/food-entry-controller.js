const foodEntry  = require('../models/food-entries.js');

const foodController = {};

foodController.index = (req,res) => {
	foodEntry.findAll()
	.then(entries => {
		res.send({
			data: entries,
		});
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
} 

foodController.show = (req,res) => {
	foodEntry.findById(req.params.id)
	.then(entry => {
		res.send({
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
		date: req.body.date,
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

foodController.delete = (req,res) => {
	foodEntry.delete(req.params.id)
	.then(() =>
		{res.redirect('/food');}
	).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = foodController;