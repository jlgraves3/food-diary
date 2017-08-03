const Stats = require('../models/stats');
const moment = require('moment');
const statsController = {};

statsController.month = (req,res) => {
	var month = req.params.month
	var first = moment(`2017-${month}-01`).add(-1,'day').format('YYYY-MM-DD') + '';
	var last = moment(first).add(1,'month').add(1,'day').format('YYYY-MM-DD') + '';
	Stats.allCals(req.user.id,first,last)
	.then(monthData => {
		let cals = [];
		let dates = [];
		monthData.forEach((i) => {
			cals.push(i.cals);
			dates.push(i.date);
		})
		res.render('stats/month-table', {
			dates: dates,
			cals: cals,
			currentPage: 'stats'
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}

statsController.index = (req,res) => {
	res.render('stats/stats-index',{
		currentPage: 'stats',
	});
}

module.exports = statsController;