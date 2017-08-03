const Stats = require('../models/stats');
const moment = require('moment');
const statsController = {};

statsController.month = (req,res) => {
	var month = req.params.month
	var first = moment(`2017-${month}-01`).add(-1,'day').format('YYYY-MM-DD') + '';
	console.log(first, typeof first);
	var last = moment(first).add(1,'month').add(1,'day').format('YYYY-MM-DD') + '';
	console.log(last);
	Stats.monthlyCals(req.user.id,first,last)
	.then(monthData => {
		console.log(monthData);
		console.log(JSON.stringify(monthData));
		res.json({data: monthData});
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