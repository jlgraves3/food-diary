const bcrypt = require('bcryptjs');
const User = require('../../models/user');

//compate passwords
function comparePass(userPassword, databasePassword) {
	return bcrypt.compareSync(userPassword, databasePassword);
}
//redirect user profile if logged in
function loginRedirect(req,res,next) {
	if (req.user) return res.redirect('/user');
	return next();
}

//require log in - redirect to login page if not logged in
function loginRequired(req,res,next) {
	if (!req.user) return res.redirect('/auth/login');
	return next();
}

module.exports = {
	comparePass,
	loginRedirect,
	loginRequired,
}