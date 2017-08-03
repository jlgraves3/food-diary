const db = require('../db/config');
const Stats = {};


Stats.monthlyCals = (userid,start,end) => {
	console.log('monthly cals');
	var returnVal = db.query(`
		SELECT * FROM food_entries
		WHERE user_id = $1 AND 
		date > $2 AND date < $3
	`,[userid,start,end]);
	console.log(JSON.stringify(returnVal));
	return returnVal;
}

module.exports = Stats;

//
