require('dotenv').load()
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');
var jwt = require('jsonwebtoken');

function Users(){
  return knex('users')
}

function Posts(){
  return knex('posts')
}

function createToken(user){
  return jwt.sign(user, process.env.TOKEN_SECRET)
}
function verifyToken(user){
  return jwt.verify(user, process.env.TOKEN_SECRET)
}


//Satellizer route that authenticates the user and logs them in.
router.post('/auth/facebook', function(req,res){
  var fields = ['id', 'email', 'first_name', 'last_name', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
  code: req.body.code,
  client_id: req.body.clientId,
  client_secret: process.env.FACEBOOK_CLIENT_SECRET,
  redirect_uri: req.body.redirectUri
 };
   request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: accessToken.error.message });
      }
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: profile.error.message });
        }
          var user = {}
          user.facebook_id = profile.id
          user.profile_image_url = 'https://graph.facebook.com/'+profile.id+'/picture?type=large'
          user.email = profile.email
          user.first_name = profile.first_name
          user.last_name = profile.last_name
          user.name = profile.name;
          user.total_hours = 0;
          var token = createToken(user)
          Users().insert(user)
            .catch(function(error){
              console.log(error);
            }).then(function(){
              res.send({token: token})
              // console.log("Successfull insert. Token is: "+token);
            })

      })
    });
})

//Gets and and allows us to display all posts
router.get('/posts', function(req,res,next){
  Posts().select().then(function(response){
    res.send(response)
  })
})
//Verify User Logged in: getting user information
router.post('/user', function(req, res){
  var token = req.body.token
  var user = verifyToken(token)
  Users().where('facebook_id', user.facebook_id).first().then(function(result){
    res.send(result)
    console.log(result);
  })

})

//Adding posts
router.post('/new/post', function(req, res, next){
var post ={}
post.facebook_id = req.body.facebook_id
post.author = req.body.author
post.author_pic = req.body.author_pic
post.title = req.body.title
post.author = req.body.author
post.address = req.body.location
post.picture_url = req.body.picture_url
post.description = req.body.description
post.hours = req.body.hours

//update total number of hours for user when they make a post
// does math to calculate total hours for user.
Users().where('facebook_id', req.body.facebook_id).first().then(function(result){
  var old_hours = result.total_hours;
  var hours = req.body.hours;
  var new_hours = old_hours + hours;
  Users().where('facebook_id', result.facebook_id).update('total_hours', new_hours).then(function(result){
    console.log("success!");
  })

})

Posts().insert(post).then(function(result){
  res.send("succesful post!")
})

})

//Show posts on the profile for user you have selected.
router.post('/getposts', function(req, res, next){
  Posts().where('facebook_id', req.body.facebook_id).then(function(response){
    res.send(response)
    })
  })


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
