const Stats = require('../models/stats');

const statsController = {};

statsController.month = (req,res) => {
	Stats.monthlyCals(req.user.id, req.params.month)
	.then(month => {
		res.json({data: month});
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}