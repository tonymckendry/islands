
app.controller("navController", function($scope, $http, $auth, posts, $location){
$scope.loggedInNav = false;
if(posts.isLoggedIn()){
    $scope.loggedInNav = !$scope.loggedInNav
}



  $scope.logout = function(){
    $auth.logout()
    console.log("successfully logged out!");
  }
})
