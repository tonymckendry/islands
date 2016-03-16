app.controller("profileController", function($scope, $http, $auth, posts, $location){
  posts.getPosts().then(function(response){
    $scope.posts = response;
  })
})
