angular.module('goalController', [])
.controller('goalCtrl', function($scope, $http, Goals) {
  Goals.get().success(function(data) {
    for (var currentIndex=0; currentIndex.length; currentIndex=currentIndex+1) {
var currentElement= data[currentIndex];
      currentElement.ok = currentIndex;
      currentElement.ko =1;
      currentElement.percentage= (currentElelment.ok/(currentElement.ok+currentElement.ko))*100;
    }
    $scope.goals = data;
  });
  $scope.addGoal = function() {
    if(!$scope.goalName || $scope.goalName === '') { return; }
    var goalObject = {
      description: $scope.goalName
    };
    Goals.create(goalObject).success(function(data) {
      $scope.goals.push(goalObject);
      $scope.goalName = '';
    });
  };
  $scope.removeGoal = function(goal) {
    Goals.delete(goal._id).success(function(data) {
      var index = $scope.goals.indexOf(goal);
      $scope.goals.splice(index, 1);
    });
  };
});
