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
      var rand1 = Math.random()
      var rand2 = Math.random()
      for (var i = 0; i < arr.length; i++) {
        if(dictionary[arr[i]]){
          console.log("'" + arr[i] +  "' exists in dictionary")
          console.log('sentiment: ' + dictionary[arr[i]])
          score += dictionary[arr[i]]
          count ++
        }
      }
      score = score*10
      count = count*10
      if (rand1 > .5) {
        if (Math.random() > .5) {
          // score += (Math.round(rand1*10))
          score += rand1*10
        }
      }
      else{
        if(Math.random() > .5){
          // score -= (Math.round(rand1*10))
          score -= rand1*10
        }
      }
      if (rand2 > .5) {
        if (Math.random() > .1) {
          // count += (Math.round(rand2*5))
          count += rand2*5
        }
      }
      // else{
      //   if(Math.random() > .5){
      //     count -= (Math.round(rand2*10))
      //   }
      // }
      var newNumber1 = score
      var newNumber2 = count
      dataset.push([newNumber1, newNumber2])
      $scope.tweets.unshift(obj)
      if ($scope.streaming == false){
        console.log('IN THE IF');
        $http.get('/stop').success(function(date){

        })
      }
      /////////
      var xScale = d3.scale.linear()
      // .domain([d3.min(dataset, function(d){return d[0]}), d3.max(dataset, function(d){return d[0]})])
      .domain([-100, 100])
      .range([padding, w - padding])

      var yScale = d3.scale.linear()
      // .domain([d3.min(dataset, function(d){return d[1]}), d3.max(dataset, function(d){return d[1]})])
      .domain([0, 50])
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
          var r = 0
          var b = 0
          if (d[0] < 0) {
            var r = Math.round(d[0] * -2.55)
            var g = Math.round(255 - (d[0] * -2.55))
          }
          if (d[0] > 0) {
            var b = Math.round(d[0] * 2.55)
            var g = Math.round(255 - (d[0] * 2.55))
          }
          var color = 'rgb(' + r + ',' + g + ',' + b + ')'
          console.log('color is: ' + color)
          return color
        })
      .transition()
        // .duration(2000)
        // .ease(Math.sqrt)
        // .attr("r", 100)
        .style("fill-opacity", 1)

        var r = 0
        var b = 0
        if (score < 0) {
          var r = Math.round(score * -2.55)
          var g = Math.round(255 - (score * -2.55))
        }
        if (score > 0) {
          var b = Math.round(score * 2.55)
          var g = Math.round(255 - (score * 2.55))
        }
        var color = 'rgb(' + r + ',' + g + ',' + b + ')'
      svg.insert("circle", "rect")
        .attr("cx", xScale(score))
        .attr("cy", yScale(count))
        .attr("r", 1e-6)
        .style("stroke", color)
        .style("stroke-opacity", 1)
        .style('fill-opacity', 0)
      .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr("r", 100)
        .style("stroke-opacity", 1e-6)
        .remove();
      // svg.selectAll('text') //labels the dpts
      //   .data(dataset)
      //   .enter()
      //   .append('text')
      //   .text(function(d){
      //     return d[0] + ',' + d[1]
      //   })
      //   .attr('x', function(d){
      //     return xScale(d[0])
      //   })
      //   .attr('y', function(d){
      //     return yScale(d[1])
      //   })
      //   .attr('font-family', 'sans-serif')
      //   .attr('font-size', '11px')
      //   .attr('fill', 'white')
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
