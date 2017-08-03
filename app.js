const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
//auth dependencies
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//initialize app
const app = express();
//add dotenv files 
require('dotenv').config();

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
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


app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req,res) => {
	res.render('index',{
		currentPage: 'index',
	});
});


const foodRoutes = require('./routes/food-routes');
app.use('/food', foodRoutes);
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);
const statsRoutes = require('./routes/stats-routes');
app.use('/stats',statsRoutes);
const archiveRoutes = require('./routes/archive-routes');
app.use('/archive',archiveRoutes);

// Error handler!
app.get('*', (req, res) => {
    res.status(404).send('not found!');
});