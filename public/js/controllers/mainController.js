app.controller('mainController', function($scope, $rootScope, $location, socket) {
  $scope.tweets = []
  socket.on('newTweet', function(tweet){
      console.log(tweet.text)
      $scope.tweets.push(tweet.text)
      console.log($scope.tweets.length)
      $scope.$digest()
  })

 });
