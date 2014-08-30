'use strict';

/**
 * @ngdoc function
 * @name ngappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngappApp
 */
angular.module('ngappApp')
  .controller('MainCtrl', function ($scope, $filter, ngTableParams) {
    var todos = [];
    for(var i=0; i < 100; i++){
        todos.push( {name : 'Item '+ i, version : i + ".0"});
    }
    $scope.todos = todos;
    $scope.contentHeight = "500px";
    $scope.todosTableParams = new ngTableParams(
        {
            page:1, // first page number
            count:20, // count per page
            sorting: {
                name:'asc'     // initial sorting
            }
        },
        {
            total: todos.length,
            getData: function($defer , params){
                $defer.resolve(todos.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        }
    );
  });