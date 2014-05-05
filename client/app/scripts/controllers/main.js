'use strict';

angular.module('ioEApp')
  .controller('MainCtrl', function ($scope,sensorsFactory,$filter) {
  	function init(){
		sensorsFactory.getLiveSensors().success(function(sensors){
			$scope.sensors = sensors;
		});
  	}

  	init();
  });



