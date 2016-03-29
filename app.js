var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var Twit = require('twit')
var io = require('./io.js')

var T = new Twit({
  consumer_key: 'jTZyV5xmvyL7M8X1aJpx3OkOS',
  consumer_secret: 'lhBS1scvA7MK9G6NXR2q2YCadDZAGlGubXVRYZkHVUKn4kWbtP',
  access_token: '21160510-QPq8U813PShIjFvYnrXC3Vv5m3sx53Ipd4wetwUg6',
  access_token_secret: 'xjLtqAsfFJXqsXodUytTPAdz270uwUUXkbKxLam6DmKT7'
})

// var stream = T.stream('statuses/filter', {locations: [-105.02,39.74,-104.94,39.78]})
var stream = T.stream('statuses/filter', {track: 'Apple'})

stream.on('tweet', function(tweet){
  console.log(tweet.text)
  console.log("____________")
  io.emit('newTweet', tweet)
})

Twit.stream

module.exports = app;
