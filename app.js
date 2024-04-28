var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require("express-flash");
const mongoose = require("mongoose");
const expressSession = require("express-session");

const mongoPass = "adwaith.6574";
let dbName = "weddingFundDatas"
const uri = `mongodb+srv://sreeadwa:${mongoPass}@cluster0.dubqcyd.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;



mongoose.connect(uri)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
  secret: 'jsudnvbysjwkskxyhdnd', 
  resave: false,
  saveUninitialized: false
}));

app.use(flash())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
