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
		(username, email, password_digest, firstname, lastname)
		VALUES ($1,$2,$3,$4,$5)
		RETURNING *
	`,[user.username, user.email, user.password_digest, user.firstname, user.lastname]);
}

module.exports = User;