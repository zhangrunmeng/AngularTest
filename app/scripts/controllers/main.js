'use strict';

/**
 * @ngdoc function
 * @name ngappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngappApp
 */
angular.module('ngappApp')
  .controller('MainCtrl', function ($scope) {
	$scope.todos = ['Item 1', 'Item 2', 'Item 3'];
  })
  .controller('InvoiceCntl', ['$scope', function ($scope) {    
	$scope.qty = 1;     
	$scope.cost = 19.95;
  }]);