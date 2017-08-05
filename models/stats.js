const db = require('../db/config');
const Stats = {};

//return total daily cals for each day between start and end date
Stats.allCals = (userid,start,end) => {
	return db.query(`
		SELECT date, SUM(cals) AS daily_sum
		FROM food_entries
		WHERE user_id = $1 AND 
		date > $2 AND date < $3
		GROUP BY date
		ORDER BY date
	`,[userid,start,end]);
}

//return total calories between start and end date
Stats.totalCals = (userid,start,end) => {
	return db.query(`
		SELECT SUM(cals)
		FROM food_entries
		WHERE user_id = $1 AND 
		date > $2 AND date < $3
	`,[userid,start,end]);
}

module.exports = Stats;

//
