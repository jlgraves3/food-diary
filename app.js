const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
require('dotenv').config();
app.use(methodOverride('_method'));


app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});

app.get('/', (req,res) => {
	res.send({
		message: 'hello world'
	});
});


const foodRoutes = require('./routes/food-routes');
app.use('/food', foodRoutes);


// Error handler!
app.get('*', (req, res) => {
    res.status(404).send('not found!');
});