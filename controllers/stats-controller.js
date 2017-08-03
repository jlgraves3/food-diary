const Stats = require('../models/stats');
const moment = require('moment');
const statsController = {};



function formatDates(dates) {
	return dates.map(date => `${moment(date).format('DD')}`);
}

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
			dates: formatDates(dates),
			cals: cals,
			currentPage: 'stats',
			username: req.user.username,
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}

statsController.index = (req,res) => {
	res.render('stats/stats-index',{
		currentPage: 'stats',
		username: req.user.username,
	});
}

module.exports = statsController;