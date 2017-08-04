const express = require('express');
const resultRoutes = express.Router();

const authHelpers = require('../services/auth/auth-helpers');
const resultController = require('../controllers/add-result-controller');

resultRoutes.post('/add', authHelpers.loginRequired, resultController.resultForm);

module.exports = resultRoutes;