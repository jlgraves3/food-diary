//import modules
const express = require('express');
const archiveRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const archiveController = require('../controllers/archive-controller');

//index route
archiveRoutes.get('/', authHelpers.loginRequired, archiveController.index);
//date route
archiveRoutes.get('/:date', authHelpers.loginRequired, archiveController.show);


module.exports = archiveRoutes;