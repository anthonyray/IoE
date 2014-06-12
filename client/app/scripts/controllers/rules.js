'use strict';

angular.module('ioEApp')
  .controller('RulesCtrl', function ($scope,rulesFactory,$filter) {
  	

  	function init(){
		rulesFactory.getRules().success(function(rules){
			$scope.rules = rules;
		});

		rulesFactory.getTriggers().success(function(triggers){
			$scope.triggers = triggers;
		});
  	}

  	init();
  });
