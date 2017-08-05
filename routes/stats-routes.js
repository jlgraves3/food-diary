//import modules
const express = require('express');
const statsRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const statsController = require('../controllers/stats-controller');

//stats index route
statsRoutes.get('/', authHelpers.loginRequired, statsController.index);

//stats month route
statsRoutes.get('/:month',authHelpers.loginRequired,statsController.month);

module.exports = statsRoutes;