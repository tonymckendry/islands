app.controller("editController", function($scope, $http, $auth, posts, $location, $route, $routeParams){
  var post_id = $routeParams.id
  posts.editPost(post_id).then(function(response){
    $scope.postInfo = response;
    console.log($scope.postInfo);
  })
})
