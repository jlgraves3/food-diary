//import modules
const foodEntry  = require('../models/food-entries.js');
const moment = require('moment');

const foodController = {};

var today = moment().format('YYYY-MM-DD');

//add formatted time field to entry object
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

//food index route - shows food entries for current day
foodController.index = (req,res) => {
	//get total daily calories
	foodEntry.dailyCals(today,req.user.id)
	.then((total) =>
		//get all entries for day
		foodEntry.findAll(today,req.user.id)
		.then(entries => {
			parseTimeMap(entries);
			//render food index page
			res.render('food-entries/food-index', {
				data: entries,
				date: moment(today).format('dddd, MMMM Do YYYY'),
				totalCals: total.sum,
				currentPage: 'food',
			});
		}).catch(err => {
	      console.log(err);
	      res.status(500).json(err);
	    }));
} 

//route for specific food entry
foodController.show = (req,res) => {
	//gets data for specific entry
	foodEntry.findById(req.params.id, today, req.user.id)
	.then(entry => {
		parseTime(entry);
		//render page for entry
		res.render('food-entries/food-single', {
			data: entry,
			currentPage: null,
		});
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
} 

//create new food entry and add to database
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


//route to edit a food entry
foodController.edit = (req,res) => {
	foodEntry.findById(req.params.id, today, req.user.id)
	.then(entry => {
		res.render('food-entries/food-update', {
			data: entry,
			currentPage: null,
		});
	}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

//update database with new data on specific entry
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


//remove food entry from database
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