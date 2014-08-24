'use strict';

/**
 * @ngdoc directive
 * @name ngappApp.directive:draggable
 * @description
 * # draggable
 */
angular.module('ngappApp')
  .directive('draggable', function ($document) {
	var startX=0, startY=0;    
	return function(scope, element) {
		element.css({        
			position: 'relative',       
			border: '1px solid red',        
			backgroundColor: 'lightgrey',       
			cursor: 'pointer'      
		});
		element.originTop = 0;
		element.originLeft = 0;
		element.bind('mousedown', function(event) { 
			startX = event.screenX - element.originLeft;      
			startY = event.screenY - element.originTop;
			$document.bind('mousemove', mousemove);      
			$document.bind('mouseup', mouseup);     
		});
		function mousemove(event) {        
			var y = event.screenY - startY;        
			var x = event.screenX - startX;        
			element.css({
				top: y + 'px',          
				left:  x + 'px'        
			});
			element.originTop = y;
			element.originLeft = x;
		}
		function mouseup() {         
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}
	};
  });
