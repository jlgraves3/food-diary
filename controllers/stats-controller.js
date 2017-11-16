//import modules
const Stats = require('../models/stats');
const moment = require('moment');

const statsController = {};

//formats dates into numbers to pass to graph
function formatDates(dates) {
	return dates.map(date => `${moment(date).format('D')}`);
}

//stats index route
statsController.index = (req,res) => {
	//set time interval for query
	var end = moment().add(1,'day').format('YYYY-MM-DD');
	var start = moment().subtract(7,'day').format('YYYY-MM-DD');
	//get stats for past week
	Stats.totalCals(req.user.id,start,end).then(totalCals => {
		Stats.allCals(req.user.id,start,end)
		//initialize data
		.then(weekData => {
			var dailyCals = {};
			//initalize dates array and dailyCals object
			for (var i=7; i > 0; i--) {
				let date = moment().subtract(i,'day').format('ddd MMM D');
				dailyCals[date] = 0;
			}
			//update dailyCals object with correct Calorie info
			weekData.map((stat) => {
				let date = moment(stat.date).format('ddd MMM D');
				dailyCals[date] = stat.daily_sum;
			});
			var dates = Object.keys(dailyCals);
			//format data object
			var data = dates.map((date) => {
				return {
						date: moment(date).format('ddd'),
						cals: dailyCals[date]
				}
			});
			//render page/graph with data
			res.render('stats/stats-index', {
				avgCals: totalCals[0].sum/weekData.length,
				currentPage: 'stats',
				data: data,
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
	var month = req.params.month;
	var start = moment(`2017-${month}-01`).add(-1,'day').format('YYYY-MM-DD');
	var end = moment(start).add(1,'month').add(2,'day').format('YYYY-MM-DD');
	monthLen = 	 moment(`2017-${month}`,'YYYY-MM').daysInMonth();
	//gets average daily cals and  daily total calories for each day in given month 
	Stats.totalCals(req.user.id,start,end).then(totalCals => {
		Stats.allCals(req.user.id,start,end)
		.then(monthData => {
			//initalize object with calories = 0 for each day
			var dailyCals = {};
			for (var i = 1; i < monthLen; i++) {
				let date = moment(start).add(i,'day');
				dailyCals[date] = 0;
			}
			monthData.forEach((stat) => {
				let date = moment(stat.date).format('YYYY-MM-DD');
				dailyCals[date] = stat.daily_sum;
			});
			var dates = Object.keys(dailyCals);
			//format data object 
			var data = dates.map((date) => {
				return {
					date: moment(date).format('D'),
					cals: dailyCals[date],
				}
			});
		//render month page and graph with data
		res.render('stats/month-table', {
			data: data,
			avgCals: totalCals[0].sum/monthData.length,
			currentPage: 'stats',
			month: moment(`2017-${month}-01`).format('MMMM'),
		});
	})

	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}


module.exports = statsController;