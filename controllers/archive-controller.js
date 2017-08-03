const Archive  = require('../models/archive.js');
const moment = require('moment');
const archiveController = {};

const today = moment().format('YYYY-MM-DD');

archiveController.index = (req,res) => {
	var past = [];
	for(var i=-10;i<0;i++) {
		past.push(moment(today).add(i,'day'));
	}
	res.render('archive/archive-index',{
		currentPage: 'archive',
		pastDays: past,
	});
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