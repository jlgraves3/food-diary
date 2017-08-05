//import modules
const express = require('express');
const userRoutes = express.Router();
const usersController = require('../controllers/users-controller');
const authHelpers = require('../services/auth/auth-helpers');

//profile page route
userRoutes.get('/', authHelpers.loginRequired, usersController.index);

module.exports = userRoutes;