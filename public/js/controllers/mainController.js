app.controller('mainController', function($scope, $rootScope, $location, $http) {
  $scope.rows = 12;
  $scope.columns = 12;

  $scope.matrix = []

  var locationOfOnes = []

  function createRow(){
    var tempRow = []
    for (var i = 0; i < $scope.columns; i++) {
      tempRow.push(Math.round(Math.random()))
    }
    $scope.matrix.push(tempRow)
  }

  for (var i = 0; i < $scope.rows; i++) {
    createRow()
  }

  $scope.matrix.forEach(function(row, index){
    row.forEach(function(cell, innerdex){
      if (cell === 1){
        locationOfOnes.push([index, innerdex])
      }
    })
  })

  console.log(locationOfOnes)


  $scope.setRows = function(rowNum){
    return new Array(rowNum)
  }
  $scope.setCols = function(colNum){
    return new Array(colNum)
  }

 });
