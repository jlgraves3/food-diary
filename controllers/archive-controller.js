//import modules
const Archive  = require('../models/archive.js');
const moment = require('moment');
const foodEntry = require('../models/food-entries');
const today = moment().format('YYYY-MM-DD');

const archiveController = {};

//archive index route
archiveController.index = (req,res) => {
	//create array with formatted dates for past 30 days
	var past = [];
	for(var i=-1;i>-31;i--) {
		let urlFormat = moment(today).add(i,'day').format('YYYY-MM-DD');
		let display = moment(today).add(i,'day').format('dddd, MMMM Do YYYY');
		past.push({
			url : urlFormat,
			display: display,
		});
	}
	//render index page
	res.render('archive/archive-index',{
		currentPage: 'archive',
		pastDays: past,
	});
}

//archive route for specific day
archiveController.show = (req,res) => {
	//get total daily calories
	foodEntry.dailyCals(req.params.date,req.user.id)
	.then((total) =>
		//get all food entries for specific day
		foodEntry.findAll(req.params.date,req.user.id)
		.then(entries => {
			//render single day view with data
			res.render('archive/day-single', {
				data: entries,
				date: moment(req.params.date).format('dddd, MMMM Do YYYY'),
				totalCals: total.sum,
				currentPage: null,
			});
		}).catch(err => {
	      console.log(err);
	      res.status(500).json(err);
	    }));
} 

module.exports = archiveController;