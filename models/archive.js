const db = require('../db/config');

const Archive = {};

Archive.getOldInfo = (oldDate,newDate,userid) => {
	return db.query(`
		SELECT * FROM food_entries
		WHERE date >= $1 AND date <= $2
		AND user_id = $3
	`,[oldDate,newDate,userid]);
}

module.exports = Archive;