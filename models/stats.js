const db = require('../db/config');
const Stats = {};


Stats.allCals = (userid,start,end) => {
	return db.query(`
		SELECT date,cals FROM food_entries
		WHERE user_id = $1 AND 
		date > $2 AND date < $3
	`,[userid,start,end]);
}

Stats.avgCals = (userid,start,end) => {
	return db.query(`
		SELECT AVG(cals) FROM food_entries
		WHERE user_id = $1 AND 
		date > $2 AND date < $3
	`,[userid,start,end]);
}

module.exports = Stats;

//
