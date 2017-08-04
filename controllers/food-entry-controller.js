const foodEntry  = require('../models/food-entries.js');
const moment = require('moment');
const foodController = {};

var today = moment().format('YYYY-MM-DD');
var yesterday = moment().add(-1,'day').format('YYYY-MM-DD');

parseTime = (entry) => {
	let time = entry.time;
	let HH = time.slice(0,2);
	let MM = time.slice(3,5);
	let A = HH >= 12 ? 'PM' : 'AM';
	hh = HH % 12;
	hh = hh === 0 ? 12 : hh;
	entry.formattedTime = `${hh}:${MM} ${A}`;
}

parseTimeMap = (entries) => {
	entries.map(parseTime);
};

foodController.index = (req,res) => {
	foodEntry.dailyCals(today,req.user.id)
	.then((total) =>
		foodEntry.findAll(today,req.user.id)
		.then(entries => {
			parseTimeMap(entries);
			res.render('food-entries/food-index', {
				data: entries,
				date: moment(today).format('dddd, MMMM Do YYYY'),
				totalCals: total.sum,
				yesterday: yesterday,
				currentPage: 'food',
				username: req.user.username,
			});
		}).catch(err => {
	      console.log(err);
	      res.status(500).json(err);
	    }));
} 

/*
foodController.indexOld = (req,res) => {
	foodEntry.dailyCals(req.params.date,req.user.id)
	.then((total) =>
		foodEntry.findAll(req.params.date,req.user.id)
		.then(entries => {
			res.render('archive/day-single', {
				data: entries,
				date: moment(req.params.date).format('dddd, MMMM Do YYYY'),
				totalCals: total.sum,
				currentPage: null,
				username: req.user.username,
			});
		}).catch(err => {
	      console.log(err);
	      res.status(500).json(err);
	    }));
} */
 
foodController.show = (req,res) => {
	foodEntry.findById(req.params.id, today, req.user.id)
	.then(entry => {
		parseTime(entry);
		res.render('food-entries/food-single', {
			data: entry,
			currentPage: 'food',
			username: req.user.username,
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
	foodEntry.findById(req.params.id, today, req.user.id)
	.then(entry => {
		res.render('food-entries/food-update', {
			data: entry,
			currentPage: 'food',
			username: req.user.username,
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

module.exports = foodController;