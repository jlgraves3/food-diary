const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});