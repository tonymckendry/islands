require('dotenv').load()
var express = require('express');
var router = express.Router();
// var knex = require('../db/knex');
var fs = require('fs')
var Twit = require('twit')
var Twitter = require('node-tweet-stream')
var io = require('../io.js')


var T = new Twit({
  consumer_key: 'jTZyV5xmvyL7M8X1aJpx3OkOS',
  consumer_secret: 'lhBS1scvA7MK9G6NXR2q2YCadDZAGlGubXVRYZkHVUKn4kWbtP',
  access_token: '21160510-QPq8U813PShIjFvYnrXC3Vv5m3sx53Ipd4wetwUg6',
  access_token_secret: 'xjLtqAsfFJXqsXodUytTPAdz270uwUUXkbKxLam6DmKT7'
})
// var T = new Twitter({
//   consumer_key: 'jTZyV5xmvyL7M8X1aJpx3OkOS',
//   consumer_secret: 'lhBS1scvA7MK9G6NXR2q2YCadDZAGlGubXVRYZkHVUKn4kWbtP',
//   token: '21160510-QPq8U813PShIjFvYnrXC3Vv5m3sx53Ipd4wetwUg6',
//   token_secret: 'xjLtqAsfFJXqsXodUytTPAdz270uwUUXkbKxLam6DmKT7'
// })

// router.get('/hello', function(req, res, next){
//   console.log('hello route')
//     T.track('steven')
//     T.on('tweet', function(tweet){
//       console.log(tweet.text)
//       io.emit('newTweet', tweet)
//     })
//
// })
router.get('/stop', function(req, res, next){
  function stopit(){
    stream.stop()
  }
  stopit()
  console.log('STOPPED!');
  res.send('success')
})

router.get('/restart', function(req, res, next){
  stream.start()
  res.send('restarted')
})

router.get('/:tweet', function(req, res, next) {

// function newTweets(){
//   T.track('apple')
//   T.on('tweet', function(tweet){
//     console.log(tweet.text)
//     io.emit('newTweet', tweet)
//   })
// }
// var stream = T.stream('statuses/filter', {locations: [-105.02,39.74,-104.94,39.78]})
function tweeter(){
  stream = T.stream('statuses/filter', {track: req.params.tweet})

  stream.on('tweet', function(tweet){
    // console.log(tweet.text)
    // console.log("____________")
    io.emit('newTweet', tweet)
  })

  res.send('streaming')
}

tweeter();

});

var stream









module.exports = router;
