'use strict';

/**
 * @ngdoc service
 * @name ngappApp.timer
 * @description
 * # timer
 * Factory in the ngappApp.
 */
angular.module('ngappApp')
  .factory('timer', function ($interval) {
	var time = {};
	var tick = function(){
		time.now = new Date().toString();
	};
	$interval(tick, 1000);
	return time;
  });
