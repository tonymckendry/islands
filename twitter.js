var Twit = require('twit')
var io = require('./socket.js')

var T = new Twit({
  consumer_key: 'jTZyV5xmvyL7M8X1aJpx3OkOS',
  consumer_secret: 'lhBS1scvA7MK9G6NXR2q2YCadDZAGlGubXVRYZkHVUKn4kWbtP',
  access_token: '21160510-QPq8U813PShIjFvYnrXC3Vv5m3sx53Ipd4wetwUg6',
  access_token_secret: 'xjLtqAsfFJXqsXodUytTPAdz270uwUUXkbKxLam6DmKT7'
})

// var stream = T.stream('statuses/filter', {locations: [-105.02,39.74,-104.94,39.78]})
var stream = T.stream('statuses/filter', {track: 'apple'})

stream.on('tweet', function(tweet){
  console.log(tweet.text)
  console.log("____________")
  io.emit('newTweet', tweet)
})

stream.stop()
// Twit.stream
