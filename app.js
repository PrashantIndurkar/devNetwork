const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const dotenv = require('dotenv');
const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');

const app = express();
const PORT = process.env.PORT || 8000;

//mongoose-driver
mongoose.Promise = global.Promise;
mongoose
	.connect(
		'mongodb+srv://prashant:prashant123@cluster0.bckpfpz.mongodb.net/?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
		}
	)
	.then((db) => {
		console.log('MONGODB connected');
	})
	.catch((error) => {
		console.log('error');
	});

//
//app.use(express.static(path.join(__dirname, 'public')));

// ... other app.use middleware
app.use(express.static(path.join(__dirname, 'client', 'build')));

//
////upload-middleware
//app.use(upload());

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
////method-override
//app.use(methodOverride('_method'));

//session-middleware
app.set('trust proxy', 1); // trust first proxy
app.use(
	session({
		secret: 'deepakkumrawat8@gmail.com',
		resave: true,
		saveUninitialized: true,
	})
);

//flash-middleware
app.use(flash());
app.use((req, res, next) => {
	//    res.locals.user= req.user || null;
	//    res.locals.success_message=req.flash('success_message');
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

//passport.js-middleware
//resposible for req.user and req.isAuthenticated()
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/auth', auth);
app.use('/posts', posts);
app.use('/profiles', profile);

// Right before your app.listen(), add this:
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
