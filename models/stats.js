const db = require('../db/config');
const moment = require('../moment');
const Stats = {};


Stats.monthlyCals = (userid,month) => {
	return db.query(`
		SELECT date, cals FROM food_entries
		WHERE user_id = $1 AND 
		date LIKE `2017-${$2}-%`
	`,[userid,month]);
}