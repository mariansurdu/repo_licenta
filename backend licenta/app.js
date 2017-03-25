var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var fs=require("fs");
var session = require('express-session');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(express.static(__dirname + '/models'));
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function(file) {
    require(modelsPath + '/' + file);
});
var algorithm = 'aes-256-ctr';
var  password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

passport.use(new Strategy(
    function(username, password, cb) {
      User.find({email:username}, function(err, user) {

        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        console.log(1);
        console.log(user);
        if (user.length!=0){
          if (decrypt(user[0].password) != password || user[0].email!=username) {
            return cb(null, false);
            console.log('xx');
          }
          return cb(null, user[0]);
        }
        else {
          return cb(null, false);
        }
      });
    }));

passport.serializeUser(function(user, cb) {
  console.log(user);
  console.log(user._id)
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
  key: 'session',
  secret: 'SUPER SECRET SECRET',
  store: require('mongoose-session')(mongoose)
}));

var User=mongoose.model("User");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'DELETE');
  res.setHeader('Access-Control-Allow-Headers',
      'X-Requested-With,content-type, Authorization');
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
mongoose.connect('mongodb://marian:marian@ds127730.mlab.com:27730/licenta',function(err){
  if(err) {
    console.log(err)
  }
  else {
    console.log("Succesfully connected!");
  }
});
console.log("aa")
module.exports = app;
