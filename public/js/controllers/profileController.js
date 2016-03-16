
app.controller("profileController", function($scope, $http, posts, $location){
  console.log("profileController");
  posts.getUserData().then(function(result){
    $scope.user = result;

  })


  posts.getPostById("10153509558071342").then(function(result){
    console.log(result);
  })



})
