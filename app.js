var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var logger = require('morgan');
const bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userRouter = require('./routes/user');
var signInRouter = require('./routes/signin');

var signUpRouter = require('./routes/signup');
var signOutRouter = require('./routes/signout');
const secret="harry potter is so not cool";

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: secret}));

// app.use('/',express.static(path.join(__dirname, 'project-client', 'build')));

app.use(passport.initialize());
app.use(passport.session());

var User = require('./model')("User");
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/user', userRouter);
app.use('/signup', signUpRouter);
app.use('/signin', signInRouter);
app.use('/signout', signOutRouter);
app.get('/', (req, res) => res.status(200).send('Im Alive!'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
