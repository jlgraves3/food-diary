const Stats = require('../models/stats');
const moment = require('moment');
const statsController = {};



function formatDates(dates) {
	return dates.map(date => `${moment(date).format('DD')}`);
}

function formatWeekDates(dates) {
	return dates.map(date => "\'" +`${moment(date).format('ddd MM D')}` + "\'" );
}

statsController.month = (req,res) => {
	var month = req.params.month
	var start = moment(`2017-${month}-01`).add(-1,'day').format('YYYY-MM-DD');
	var end = moment(start).add(1,'month').add(2,'day').format('YYYY-MM-DD');
	monthLen = 	 moment(`2017-${month}`,'YYYY-MM').daysInMonth();

	Stats.totalCals(req.user.id,start,end).then(totalCals => {
		Stats.allCals(req.user.id,start,end)
		.then(monthData => {
			let cals = [];
			let dates = [];
			monthData.forEach((i) => {
				cals.push(i.daily_sum + '');
				dates.push(i.date);
			});
		res.render('stats/month-table', {
			dates: formatDates(dates),
			cals: cals,
			avgCals: totalCals[0].sum/monthLen,
			currentPage: null,
			username: req.user.username,
			month: moment(`2017-${month}-01`).format('MMMM')
		});
	})

	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}


statsController.index = (req,res) => {
	var end = "\'" + moment().format('YYYY-MM-DD') + "\'" ;
	var start = "\'" + moment().subtract(7,'day').format('YYYY-MM-DD') + "\'" ;
	console.log(start,end);

	Stats.totalCals(req.user.id,start,end).then(totalCals => {
		Stats.allCals(req.user.id,start,end)

		.then(weekData => {
			let cals = [];
			let dates = [];
			weekData.forEach((i) => {
				cals.push(i.daily_sum + '');
				dates.push(i.date);
			});

		res.render('stats/stats-index', {
			dates: formatDates(dates),
			cals: cals,
			avgCals: totalCals[0].sum/7,
			currentPage: 'stats',
			username: req.user.username,
			months: pastYearMonths(),
		});
	});

	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}

function pastYearMonths() {
	let pastTwelveMonths = [];
	for (var i=0;i<12;i++) {
		pastTwelveMonths.push(
			{
			number: moment().subtract(i,'month').format('M'),
			string: moment().subtract(i,'month').format('MMMM')
		});
	}
	return pastTwelveMonths;
}



module.exports = statsController;