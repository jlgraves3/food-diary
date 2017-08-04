const Stats = require('../models/stats');
const moment = require('moment');
const statsController = {};



function formatDates(dates) {
	return dates.map(date => `${moment(date).format('DD')}`);
}

statsController.month = (req,res) => {
	var month = req.params.month
	var first = moment(`2017-${month}-01`).add(-1,'day').format('YYYY-MM-DD');
	var last = moment(first).add(1,'month').add(1,'day').format('YYYY-MM-DD');
	Stats.allCals(req.user.id,first,last)
	.then(monthData => {
		console.log(monthData);
		let cals = [];
		let dates = [];
		monthData.forEach((i) => {
			cals.push(i.daily_sum + '');
			dates.push(i.date);
		})
		res.render('stats/month-table', {
			dates: formatDates(dates),
			cals: cals,
			currentPage: 'stats',
			username: req.user.username,
			month: moment(`2017-${month}-01`).format('MMMM')
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}

statsController.index = (req,res) => {
	var pastTwelveMonths = [];
	for (var i=0;i<12;i++) {
		pastTwelveMonths.push(
			{
			number: moment().subtract(i,'month').format('M'),
			string: moment().subtract(i,'month').format('MMMM')
		});
	}
	res.render('stats/stats-index',{
		currentPage: 'stats',
		username: req.user.username,
		months : pastTwelveMonths
	});
}

module.exports = statsController;