const Archive  = require('../models/archive.js');
const moment = require('moment');
const archiveController = {};
const foodEntry = require('../models/food-entries');

const today = moment().format('YYYY-MM-DD');

archiveController.index = (req,res) => {
	var past = [];
	for(var i=-1;i>-15;i--) {
		let urlFormat = moment(today).add(i,'day').format('YYYY-MM-DD');
		let display = moment(today).add(i,'day').format('dddd, MMMM Do YYYY');
		past.push({
			url : urlFormat,
			display: display,
		});
	}
	res.render('archive/archive-index',{
		currentPage: 'archive',
		pastDays: past,
	});
}

archiveController.show = (req,res) => {
	foodEntry.dailyCals(req.params.date,req.user.id)
	.then((total) =>
		foodEntry.findAll(req.params.date,req.user.id)
		.then(entries => {
			res.render('archive/day-single', {
				data: entries,
				date: moment(req.params.date).format('dddd, MMMM Do YYYY'),
				totalCals: total.sum,
				currentPage: 'archive',
				username: req.user.username,
			});
		}).catch(err => {
	      console.log(err);
	      res.status(500).json(err);
	    }));
} 

archiveController.monthIndex = (req,res) => {
	var newDate = moment().format('YYYY-MM-DD');
	var oldDate = moment().add(-1,'month').format('YYYY-MM-DD');
	Archive.getOldInfo(oldDate,newDate,req.user.id)
	.then(entries => {
		res.json({data: entries});
	}).catch(err => {
		res.status(500).json(err);
	})
}

module.exports = archiveController;