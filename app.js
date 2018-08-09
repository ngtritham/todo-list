const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const passport = require('passport');
const passportfb = require('passport-facebook').Strategy;
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const app = express();

app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// Setup sesion
app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));

//Setup passport
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, './public')));


app.use(bodyParser.urlencoded({
  extended: true
}))

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;