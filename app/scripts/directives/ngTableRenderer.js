/**
 * Created by runmengz on 8/27/2014.
 */
angular.module('ngTableRenderer', ['ngTable'])
    .directive('ngTableRenderer', function($compile, $timeout) {

        var trim = function(value1, value2){
            return value1.substring(0, value1.indexOf("px")) - value2.substring(0, value2.indexOf("px"));
        }

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '../../views/table.html',
            link :  function (scope, element, attrs) {
                var contentHeight = attrs.contentHeight;
                scope.$watch('attrs.contentHeight', function(value){
                    element.find("div[class='contentDiv']").css('height', value);
                }, true);
                element.find("div[class='contentDiv']").css('height', contentHeight);
                var tableparams = element.find("table[id!='table-header']").attr('ng-table');
                scope.$watch(tableparams + ".settings().scope", function(tablescope){
                   if(!angular.isUndefined(tablescope)){
                       scope.targetTableScope = tablescope.$id;
                       var headerTemplate = angular.element(document.createElement('thead')).attr('ng-include', 'templates.header');
                       element.find("table[id='table-header']").append(headerTemplate);
                       $compile(headerTemplate)(tablescope);
                       element.find("table[id!='table-header']").find('thead').remove();
                   }
                });
                var func = function(){
                    var ngtable = element.find("table[id!='table-header']");
                    //headtable.attr('style', ngtable.attr('style'));
                    var columnes = angular.element(ngtable.find('tr')[0]).find('td');
                    if(scope.columns && scope.columns.length == columnes.length){
                        angular.forEach(columnes, function(td, idx){
                            td = angular.element(td);
                            if(!td.hasClass('ng-hide') && scope.columns[idx]){
                                td.css('width', scope.columns[idx].width + 'px');
                            }
                        });
                        return;
                    } else {
                        scope.columns = columnes;
                        var headtable = element.find("table[id='table-header']");
                        headtable.width(ngtable.width() + "px");
                        angular.forEach(angular.element(headtable.find('tr')[0]).find('th'), function(th, idx){
                            th = angular.element(th);
                            if(!th.hasClass('ng-hide') && columnes[idx]){
                                var col = angular.element(columnes[idx]);
                                columnes[idx].width = col.width();
                                th.css('width', columnes[idx].width + 'px');
                                col.css({
                                    width : columnes[idx].width + "px"
                                });
                            }
                        });
                    }
                };
                scope.$on('ngTableAfterReloadData', function(evt){
                    if(!scope.targetTableScope || scope.targetTableScope != evt.targetScope.$id){
                        return;
                    }
                    $timeout(func, 0)
                });
            }
        };
    });