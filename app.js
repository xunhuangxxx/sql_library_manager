var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// import sequelize instance from models/index.js
const sequelize = require('./models/index').sequelize;

try {
   sequelize. authenticate();
   console.log('Connection has been established successfully.');
   //sync all the models 
   sequelize.sync();
  } catch (error) {
   console.error('Unable to connect to the database:', error);
  }
  
  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //Create new error
  const error = new Error();
  error.status = 404;
  error.message = "Sorry! We couldn't find the page you were looking for.";
  console.log(error.status+':'+ error.message);
  res.status(error.status, {error});
  res.render('page-not-found', {error});
  //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //Create global error
  if(err.status !== 500){
    err.status = 500;
    err.message = "Sorry! There was an unexpected error on the server";
    console.log(err.status+':'+ err.message);
  }
  // render the error page
  res.status(err.status || 500, {err});
  res.render('error');
});

module.exports = app;
