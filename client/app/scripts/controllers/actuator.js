'use strict';

angular.module('ioEApp')
  .controller('ActuatorCtrl', function ($scope,$routeParams,sensorsFactory,$filter) {
  	$scope.actuatorId = $routeParams.actuatorId;

  	function init(){
		sensorsFactory.getLiveActuator($scope.actuatorId).success(function(actuator){
			$scope.liveActuator = actuator;
		});
		
  	}

  	$scope.setValue = function(value){
  		sensorsFactory.setActuatorValue($scope.actuatorId,value).success(function(){
  			console.log("Value Changed");
  		});
  	}
  	
  	init();
  });
