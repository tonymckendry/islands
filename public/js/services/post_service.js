app.service('posts', function($http){
  this.getPosts = function(){
  return $http.get('posts').then(function(response){
    return response.data;
  })
};

this.getUserData = function(){

var token = localStorage.getItem('satellizer_token')
var data = JSON.stringify({token : token})
  return $http.post('user', data).then(function(response){
  return response.data
  })
};

this.getPostById = function(facebook_id){
  var user_info = {}
  user_info.facebook_id = facebook_id
  console.log(user_info);
  return $http.post('getposts', user_info).then(function(response){
    console.log("this is the response");
    console.log(response);
    return response.data
  })

}


})
