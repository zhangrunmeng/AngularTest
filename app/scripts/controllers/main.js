'use strict';

/**
 * @ngdoc function
 * @name ngappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngappApp
 */
angular.module('ngappApp')
  .controller('MainCtrl', function ($scope,$timeout, $filter, ngTableParams) {
    var todos = [];
    for(var i=0; i < 10000; i++){
        todos.push( {name : 'Item '+ i, version : i + ".0"});
    }

        $scope.filterOptions = {
            filterText: "0",
            useExternalFilter: false
        };

        $scope.pagingOptions = {
        pageSizes: [20, 50, 100],
        pageSize: 20,
        currentPage: 1
    };

    $scope.setPagingData = function(data, page, pageSize){
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
//        if (!$scope.$$phase) {
//            $scope.$apply();
//        }
    };
    $scope.totalServerItems = todos.length;
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.setPagingData($scope.todos.filter(function(item){
                return item.name.indexOf($scope.filterOptions.filterText) != -1;
            }), $scope.pagingOptions.currentPage,  $scope.pagingOptions.pageSize);
        }
    }, true);

    $scope.todos = todos;
    $scope.myData = todos;
    $scope.mySelections = [];
    $scope.gridOptions = {
        data : 'myData',
        columnDefs : [{field : 'name', visible: true}, {field : 'version', visible: true}],
        enablePaging: true,
        showFooter: false,
        totalServerItems : 'totalServerItems',
        showFilter : true,
        showColumnMenu : true,
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        selectedItems: $scope.mySelections,
        multiSelect : false
    };
    $scope.$watch('mySelections', function(newvalue, oldvalue){
        if(newvalue !== oldvalue){

        }
    }, true);

    $scope.setPagingData($scope.todos, $scope.pagingOptions.currentPage,  $scope.pagingOptions.pageSize);

    $scope.togglePage = function(step){
        $scope.pagingOptions.currentPage += step;
        $scope.gridOptions.columnDefs[1].visible = $scope.pagingOptions.currentPage > 1;
        $scope.gridOptions.columnDefs[0].visible = $scope.pagingOptions.currentPage == 1;
    }

    $scope.pageBackward = function() {
        var page = $scope.pagingOptions.currentPage;
        $scope.pagingOptions.currentPage = Math.max(page - 1, 1);
    };
//    $scope.contentHeight = "500px";
//    $scope.todosTableParams = new ngTableParams(
//        {
//            page:1, // first page number
//            count:20, // count per page
//            sorting: {
//                name:'asc'     // initial sorting
//            }
//        },
//        {
//            total: todos.length,
//            getData: function($defer , params){
//                $defer.resolve(todos.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//            }
//        }
//    );
  });