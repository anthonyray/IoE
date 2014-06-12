'use strict';

angular.module('ioEApp')
  .controller('RulesCreatorCtrl', function ($scope,sensorsFactory,rulesFactory,$filter) {
  	

  	function init(){
		rulesFactory.getRules().success(function(rules){
			$scope.rules = rules;
		});

		rulesFactory.getTriggers().success(function(triggers){
			$scope.triggers = triggers;
		});

		rulesFactory.getActions().success(function(actions){
			$scope.actions = actions;
		});

		sensorsFactory.getLiveActuators().success(function(actuators){
			$scope.actuators = actuators;
		});
  	}

  	$scope.createRule = function(rule){
  		rulesFactory.createRule(rule).success(function(){
  			alert("ALRIGHT");
  		})
  	}

  	init();
  });
