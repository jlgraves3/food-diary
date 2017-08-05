//import modules
const Stats = require('../models/stats');
const moment = require('moment');

const statsController = {};

//formats dates into numbers to pass to graph
function formatDates(dates) {
	return dates.map(date => `${moment(date).format('DD')}`);
}
/*
function formatWeekDates(dates) {
	return dates.map(date => "\'" +`${moment(date).format('ddd MM D')}` + "\'" );
}*/


//stats index route
statsController.index = (req,res) => {
	var end = "\'" + moment().format('YYYY-MM-DD') + "\'" ;
	var start = "\'" + moment().subtract(7,'day').format('YYYY-MM-DD') + "\'" ;
	console.log(start,end);

	//get stats for past week
	Stats.totalCals(req.user.id,start,end).then(totalCals => {
		Stats.allCals(req.user.id,start,end)
		//initialize data
		.then(weekData => {
			let cals = [];
			let dates = [];
			weekData.forEach((i) => {
				cals.push(i.daily_sum + '');
				dates.push(i.date);
			});
		//render page/graph with data
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

//returns array of past twelve months (formatted)
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


//stats month route
statsController.month = (req,res) => {
	var month = req.params.month
	var start = moment(`2017-${month}-01`).add(-1,'day').format('YYYY-MM-DD');
	var end = moment(start).add(1,'month').add(2,'day').format('YYYY-MM-DD');
	monthLen = 	 moment(`2017-${month}`,'YYYY-MM').daysInMonth();
	//gets average daily cals and  daily total calories for each day in given month 
	Stats.totalCals(req.user.id,start,end).then(totalCals => {
		Stats.allCals(req.user.id,start,end)
		.then(monthData => {
			//initialize datasets
			let cals = [];
			let dates = [];
			monthData.forEach((i) => {
				cals.push(i.daily_sum + '');
				dates.push(i.date);
			});
		//render month page and graph with data
		res.render('stats/month-table', {
			dates: formatDates(dates),
			cals: cals,
			avgCals: totalCals[0].sum/monthLen,
			currentPage: null,
			month: moment(`2017-${month}-01`).format('MMMM')
		});
	})

	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}


module.exports = statsController;