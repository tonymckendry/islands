app.controller('mainController', function($scope, $rootScope, $location, socket, $http) {
  var thing = ["asef" , "sadsf", "asdfads"];
  $scope.tweets = []
  $scope.streaming = true;
  // $scope.tweets = thing;
  socket.on('newTweet', function(tweet){
    console.log($scope.streaming);
      // console.log(tweet.text)
      var obj = {}
      obj.tweet = tweet.text
      $scope.tweets.unshift(obj)
      // console.log($scope.tweets.length)
      if ($scope.streaming == false){
        console.log('IN THE IF');
        $http.get('/stop').success(function(date){

        })
      }
      $scope.$digest()
  })

  $scope.callIt = function(term){
    console.log('CALLED IT');
    $http.get('/' + term).success(function(data){
    })
    $scope.streaming = true;
  }

  $scope.stopIt = function(){
    console.log('Stop Button');
    $scope.streaming = false
    $http.get('/stop').success(function(data){
      console.log('DATA!');
      console.log(data)
    })
  }

  $scope.restart=function(){
    $scope.streaming=true;
    $http.get('/restart').success(function(data){

    })
  }



 });
