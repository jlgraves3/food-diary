const db = require('../db/config');

const foodEntry = {};

foodEntry.findAll = () => {
	return db.query('SELECT * FROM food_entries ORDER BY time');
}

foodEntry.findById = id => {
	return db.oneOrNone(`SELECT * FROM food_entries WHERE id = $`,[id]);
} 

foodEntry.create = (entry) => {
	return db.one(`
		INSERT INTO food_entries
		(name, date, time, cals,details)
		VALUES ($1, $2, $3, $4,$5)
		RETURNING *
	`, [entry.name, entry.date, entry.time, entry.cals, entry.details]);	
}

foodEntry.update = (entry, id) => {
	return db.none(`
		UPDATE food_entries SET
			name = $1,
			date = $2,
			time = $3,
			cals = $4,
			details = $5
			WHERE id= $6
	`, [entry.name, entry.date, entry.time, entry.cals, entry.details,id]);
}

foodEntry.destroy = id => {
	return db.none(`
		DELETE FROM food_entries
		WHERE id = $1
	`,[id]);
};

module.exports = foodEntry;