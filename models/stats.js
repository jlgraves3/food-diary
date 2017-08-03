const db = require('../db/config');
const moment = require('../moment');
const Stats = {};


Stats.monthlyCals = (userid,month) => {
	return db.query(`
		SELECT date, cals FROM food_entries
		WHERE user_id = $1 AND 
		date >= `2017-$2-01` AND date < `2017-$3-01`
	`,[userid,month,month+1]);
}



module.exports = Stats;