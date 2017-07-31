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
		(name, date, time, cals, user_id)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *
	`, [entry.name, entry.date, entry.time, entry.cals, entry.user_id]);	
}