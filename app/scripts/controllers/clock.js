'use strict';

angular.module('ngappApp')
.controller('ClockCtrl', ['$scope', 'timer', function($scope, timer){
	$scope.time = timer;
  }]);