const db = require('../db/config');

const User = {};

//find user by username
User.findByUserName = username => {
	return db.oneOrNone(`
		SELECT * FROM users 
		WHERE username = $1
	`, [username]);
}

//insert new user into users table
User.create = user => {
	return db.one(`
		INSERT INTO users
		(username, password_digest)
		VALUES ($1,$2)
		RETURNING *
	`,[user.username, user.password_digest]);
}

module.exports = User;