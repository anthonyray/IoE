'use strict';

angular.module('ioEApp')
  .controller('MainCtrl', function ($scope,sensorsFactory,$filter) {
  	function init(){
		sensorsFactory.getLiveSensors().success(function(sensors){
			$scope.sensors = sensors;
		});

		sensorsFactory.getDbSensors().success(function(sensors){
			$scope.dbSensors = sensors;
		});

		sensorsFactory.getLiveActuators().success(function(actuators){
			$scope.actuators = actuators;
		})
  	}

  	init();
  });



