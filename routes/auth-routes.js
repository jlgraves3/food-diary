//import modules
const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

//login page
authRouter.get('/login', authHelpers.loginRedirect, (req,res) => {
	res.render('auth/login', {currentPage: 'login'});
});

//register page
authRouter.get('/register',authHelpers.loginRedirect, (req,res) => {
	res.render('auth/register', {currentPage: 'register'});
});

//create new user 
authRouter.post('/register',usersController.create);

//authenticate existing user
authRouter.post('/login',passport.authenticate('local', {
	successRedirect: '/food',
	failureRedirect: '/auth/login',
	failureFlash: true, 
	})
);

//logout route
authRouter.get('/logout', (req,res) => {
	req.logout();
	res.redirect('/');
});

module.exports = authRouter;
