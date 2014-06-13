'use strict';

angular.module('ioEApp')
  .controller('RulesCtrl', function ($scope,$routeParams,sensorsFactory,rulesFactory,$filter,$location) {
  	if ($routeParams)
  		$scope.ruleId = $routeParams.ruleId;

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
  			$location.path('/rules');
  		});
  	};

  	$scope.deleteRule = function(){
  		rulesFactory.deleteRule($scope.ruleId).success(function(){
  			$location.path('/rules');
  		});
  	};

  	init();
  });
