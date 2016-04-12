app.controller('mainController', function($scope, $rootScope, $location, socket, $http) {
  $scope.tweets = []
  $scope.streaming = true;
  // $scope.tweets = thing;

  var svg = d3.select('div.a') //creates the canvas
    .append('svg')
    .attr('width', w)

  // svg.append('g') // create X axis
  //   .attr('class', 'axis')
  //   .attr('transform', 'translate(0,' + (h - padding) + ')')
  //   .call(xAxis)
  //
  // svg.append('g') // Create Y axis
  //   .attr('class', 'axis')
  //   .attr('transform', 'translate(' + padding + ',0)')
  //   .call(yAxis)

  socket.on('newTweet', function(tweet){
      var obj = {}
      obj.tweet = tweet.text
      var arr = tweet.text.split(' ')
      var score = 0
      var count = 0
      var rand1 = Math.random()
      var rand2 = Math.random()
      var rando = Math.random()
      for (var i = 0; i < arr.length; i++) {
        if(dictionary[arr[i]]){
          // console.log("'" + arr[i] +  "' exists in dictionary")
          // console.log('sentiment: ' + dictionary[arr[i]])
          score += dictionary[arr[i]]
          count ++
        }
      }
      if (rando > .5) {
        if (rand1 > .5) {
          score += rand1
        }
        else{
          score -= rand1
        }
        if (rand2 > .5) {
          count += rand2
        }
      }
      score = score*10
      count = count*10

      obj.coords = score.toFixed(2) + ", " + count.toFixed(2)
      var newNumber1 = score
      var newNumber2 = count
      dataset.push([newNumber1, newNumber2])

      if ($scope.streaming == false){
        console.log('IN THE IF');
        $http.get('/stop').success(function(date){

        })
      }
      ///////
      var xScale = d3.scale.linear()
      .domain([-100, 100])
      .range([padding, w - padding])

      var yScale = d3.scale.linear()
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
          var g = 255
          if (d[0] < 0) {
            r = Math.round(d[0] * -2.55)
            g = Math.round(255 - (d[0] * -2.55))
          }
          if (d[0] > 0) {
            b = Math.round(d[0] * 2.55)
            g = Math.round(255 - (d[0] * 2.55))
          }
          if (g == undefined) {
            g = 255
          }


          var color = 'rgb(' + r + ',' + g + ',' + b + ')'
          console.log('color is: ' + color)
          return color
        })
      // .transition()
      //   // .duration(2000)
      //   // .ease(Math.sqrt)
      //   // .attr("r", 100)
      //   .style("fill-opacity", 1)

        var r = 0
        var b = 0
        var g = 255
        if (score < 0) {
          var r = Math.round(score * -2.55)
          var g = Math.round(255 - (score * -2.55))
        }
        if (score > 0) {
          var b = Math.round(score * 2.55)
          var g = Math.round(255 - (score * 2.55))
        }
        if (g == undefined){
          g == 255;
        }
        var color = 'rgb(' + r + ',' + g + ',' + b + ')'
        console.log(obj.tweet);
        console.log('obj color is: ' + color);
        obj.color = color
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
      var average = 0
      var count = 0
      for (var i = 0; i < dataset.length; i++) {
        if (dataset[i][0] !== 0) {
          average += dataset[i][0]
          count ++
        }
      }
      average = (average / count).toFixed(2)
      $scope.average = average
      $scope.negWidth = parseInt(average*-1);
      $scope.posWidth = parseInt(average);
      var avr = 0
      var avb = 0
      var avg = 255
      if (average < 0) {
        avr = Math.round(average * -2.55)
        avg = Math.round(255 - (average * -2.55))
      }
      if (average > 0) {
        avb = Math.round(average * 2.55)
        avg = Math.round(255 - (average * 2.55))
      }
      if (avg == undefined){
        avg == 255;
      }
      var avcolor = 'rgb(' + avr + ',' + avg + ',' + avb + ')'
      $scope.avcolor = avcolor
      $scope.total = dataset.length
      $scope.tweets.unshift(obj)
      $scope.$digest()
  })

  $scope.callIt = function(term){ //starts the tweet stream when you press the button
    console.log('CALLED IT');
    $http.get('/' + term).success(function(data){
    })
    console.log('streaming success');
    $scope.streaming = true;
    $scope.showGraph = true;
  }

  $scope.stopIt = function(){ //stops the tweet stream when you press the button
    console.log('Stop Button');
    $scope.streaming = false
    $http.get('/stop').success(function(data){
      console.log('DATA!');
      console.log(data)
    })
    console.log(dataset);
  }

  $scope.restart=function(){ //restarts the tweet stream when you press the button
    $scope.streaming=true;
    $http.get('/restart').success(function(data){

    })
  }
     $(document).ready(function () {
       $('#myModal').modal('show');
     });

 });
