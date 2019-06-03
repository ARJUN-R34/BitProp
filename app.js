var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require("web3");

web3 = new Web3("http://localhost:8545");

var MyContractJSON = require(path.join(__dirname, 'build/contracts/Land.json'));

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

coinbase = "0x70e3f4c96111201c2795220ded3754b7bdb7b8f3";

contractAddress = MyContractJSON.networks['4002'].address;

console.log("The contract address is : ", contractAddress);

const abi = MyContractJSON.abi;

Contract = new web3.eth.Contract(abi, contractAddress);


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var registrarRouter = require('./routes/registrar');
var superadminRouter = require('./routes/superadmin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/registrar', registrarRouter);
app.use('/superadmin', superadminRouter);

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
