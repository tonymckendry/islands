app.controller('mainController', function($scope, $location, $auth) {

   $scope.login = function() {
     $auth.login($scope.user)
       .then(function() {
         console.log('You have successfully signed in!');
         $location.path('/');
       })
       .catch(function(error) {
         console.log(error.data.message, error.status);
       });
   };
   $scope.authenticate = function(provider) {
     $auth.authenticate(provider)
       .then(function(response) {
         console.log('You have successfully signed in with ' + provider + '!');
         console.log(response.data.token);
         $location.path('/post');
       })
       .catch(function(error) {
         if (error.error) {
           // Popup error - invalid redirect_uri, pressed cancel button, etc.
           console.log(error.error);
         } else if (error.data) {
           // HTTP response error from server
         console.log(error.data.message, error.status);
         } else {
           console.log(error);
         }
       });
   };
   $scope.logout = function(){
     $auth.logout()
     console.log("successfully logged out!");
   }
 });


app.controller("postController", function($scope, $http, $auth, posts, $location){
  posts.getPosts().then(function(response){
    $scope.posts = response;
  })
})
app.controller("newController", function($scope, $http, posts){
  posts.getUserData().then(function(result){
    $scope.author_picture = result.profile_image_url
    $scope.author_name = result.name

  })

  $scope.submitPost = function(){
    posts.getUserData().then(function(result){
      var post = {};
      post.facebook_id = result.facebook_id;
      post.author = result.name
      post.title = $scope.title
      post.location = $scope.location
      post.child_name = $scope.child_name
      post.description = $scope.description
      post.picture_url = "null"
      console.log(post);
      $http.post('new/post', post).then(function(response){
        console.log(response);
        window.location.href = '/#/post';
      })
    })
  }
});
