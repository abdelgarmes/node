var createError = require('http-errors');
var express = require('express');
var session = require('express-session')
const bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
var router = express.Router();

var app = express();

/**
 * bodyParser
 */
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**
 * liveReloadServer
 */
 const liveReloadServer = livereload.createServer();
 liveReloadServer.server.once("connection", () => {
   setTimeout(() => {
     liveReloadServer.refresh("/");
   }, 10);
 });
 app.use(connectLiveReload());


/**
 * Sessions
 */
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

/**
 * Router
 */

var indexRouter = require('./routes/index');
var foodTrucks  = require('./routes/foodTrucks/ajouter');
router.use(require('./middlewares/flash'));
app.use( router );
app.use('/', indexRouter);
app.use('/foodtrucks', foodTrucks);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))




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
