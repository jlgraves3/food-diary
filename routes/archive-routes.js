const express = require('express');
const archiveRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const archiveController = require('../controllers/archive-controller');

archiveRoutes.get('/', authHelpers.loginRequired, archiveController.index);


module.exports = archiveRoutes;