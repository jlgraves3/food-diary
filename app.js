const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//auth dependencies
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const app = express();
require('dotenv').config();

app.use(methodOverride('_method'));


app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

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