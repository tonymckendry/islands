
app.controller("postController", function($scope, $http, $auth, posts, $location){
  posts.getPosts().then(function(response){
    $scope.posts = response;
  })

  $scope.userData;
  $scope.isAdmin;
  posts.getUserData().then(function(payload){
    $scope.userData = payload;
    console.log(payload);
    console.log($scope.userData['is_admin']);
    if ($scope.userData['is_admin'] === true) {
    $scope.isAdmin = true;
  } else {
    $scope.isAdmin = false;
  }
  console.log($scope.isAdmin);  
  })
})
