const express = require('express');
const statsRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const statsController = require('../controllers/stats-controller');


statsRoutes.get('/', authHelpers.loginRequired, statsController.index);

statsRoutes.get('/:month',statsController.month);


module.exports = statsRoutes;