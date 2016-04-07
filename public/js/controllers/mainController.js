app.controller('mainController', function($scope, $rootScope, $location, socket, $http) {
  $scope.tweets = []
  $scope.streaming = true;
  // $scope.tweets = thing;
  socket.on('newTweet', function(tweet){
      var obj = {}
      obj.tweet = tweet.text
      var arr = tweet.text.split(' ')
      var score = 0
      var count = 0
      for (var i = 0; i < arr.length; i++) {
        if(dictionary[arr[i]]){
          console.log("'" + arr[i] +  "' exists in dictionary")
          console.log('sentiment: ' + dictionary[arr[i]])
          score += dictionary[arr[i]]
          count ++
        }
      }
      console.log('Score is: ' + score);
      console.log('Count is: ' + count);
      var newNumber1 = score
      var newNumber2 = count
      if (count > 0) {
        dataset.push([newNumber1, newNumber2])
      }
      $scope.tweets.unshift(obj)
      if ($scope.streaming == false){
        console.log('IN THE IF');
        $http.get('/stop').success(function(date){

        })
      }
      /////////
      var xScale = d3.scale.linear()
      .domain([d3.min(dataset, function(d){return d[0]}), d3.max(dataset, function(d){return d[0]})])
      // .domain([-500, 500])
      .range([padding, w - padding])

      var yScale = d3.scale.linear()
      .domain([d3.min(dataset, function(d){return d[1]}), d3.max(dataset, function(d){return d[1]})])
      // .domain([-100, 100])
      .range([h - padding, padding])

      var rScale = d3.scale.linear() // sets the scale for the dot radius
      .domain([0, d3.max(dataset, function(d){ return d[1]})]) // finds the greatest Y value
      .range([2, 7])
      //////
      svg.selectAll('circle') // creates the dots
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', function(d){ //x position, scaled
          return xScale(d[0])
        })
        .attr('cy', function(d){ //y position, scaled
          return yScale(d[1])
        })
        .attr('r', function(d){ //dot radius, scaled
          return rScale(d[1])
        })
        .attr('fill', function(d){
          var r = Math.round(Math.random() * 255)
          var g = 0
          var b = 0
          var color = 'rgb(' + r + ',' + g + ',' + b + ')'
          return color
        })
      svg.selectAll('text') //labels the dpts
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d){
          return d[0] + ',' + d[1]
        })
        .attr('x', function(d){
          return xScale(d[0])
        })
        .attr('y', function(d){
          return yScale(d[1])
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', 'black')
      $scope.$digest()
  })

  $scope.callIt = function(term){ //starts the tweet stream when you press the button
    console.log('CALLED IT');
    $http.get('/' + term).success(function(data){
    })
    $scope.streaming = true;
  }

  $scope.stopIt = function(){ //stops the tweet stream when you press the button
    console.log('Stop Button');
    $scope.streaming = false
    $http.get('/stop').success(function(data){
      console.log('DATA!');
      console.log(data)
    })
  }

  $scope.restart=function(){ //restarts the tweet stream when you press the button
    $scope.streaming=true;
    $http.get('/restart').success(function(data){

    })
  }


 });
