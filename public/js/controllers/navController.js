
app.controller("navController", function($scope, $http, $auth, posts, $location){
$scope.loggedInNav = false;
$scope.logIn = true;
if(posts.isLoggedIn()){
    $scope.loggedInNav = !$scope.loggedInNav
}



  $scope.logout = function(){
    $auth.logout()
    console.log("successfully logged out!");
  }

  if(localStorage.satellizer_token){
    $scope.logIn = false;
    $scope.loggedIn = true;
  }
  console.log("Logged in: " + $scope.loggedIn);

})
