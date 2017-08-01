const db = require('../db/config');
const moment = require('moment');

const foodEntry = {};

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const formattedDate = 


foodEntry.findAll = date => {
	console.log(date);
	return db.query(`
		SELECT * FROM food_entries 
		WHERE date = $1
		ORDER BY time 
	`, date);
}

foodEntry.findById = id => {
	return db.oneOrNone(`SELECT * FROM food_entries WHERE id = $1`,[id]);
} 

foodEntry.create = (entry,date) => {
	return db.one(`
		INSERT INTO food_entries
		(name, date, time, cals,details)
		VALUES ($1, $2, $3, $4,$5)
		RETURNING *
	`, [entry.name, date, entry.time, entry.cals, entry.details]);	
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

foodEntry.delete = id => {
	return db.none(`
		DELETE FROM food_entries
		WHERE id = $1
	`,[id]);
};

module.exports = foodEntry;