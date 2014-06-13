'use strict';

angular
  .module('ioEApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute','angles'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/rules',{
        templateUrl : 'views/rules.html',
        controller : 'RulesCtrl'
      })
      .when('/rules/create',{
        templateUrl : 'views/rulescreator.html',
        controller : 'RulesCtrl'
      })
      .when('/rules/delete/:ruleId',{
        templateUrl : 'views/rulesdelete.html',
        controller : 'RulesCtrl'
      })
      .when('/sensor/:sensorId',{
        templateUrl : 'views/sensor.html',
        controller : 'SensorCtrl'
      }).
      when('/actuator/:actuatorId',{
        templateUrl : 'views/actuator.html',
        controller : 'ActuatorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('ioEApp').factory('sensorsFactory', function($http) { 
  var factory = {};
            
  factory.getLiveSensors = function() {
    return $http.get('/api/realtime/sensors');
  };

  factory.getLiveActuators = function() {
    return $http.get('/api/realtime/actuators');
  };

  factory.getDbSensors = function(){
    return $http.get('/api/db/sensors');
  };

  factory.getLiveSensor = function(id) {
    return $http.get('/api/realtime/sensor/'+id);
  }; 

  factory.getLiveActuator = function(id) {
    return $http.get('/api/realtime/actuator/'+id);
  }; 

  factory.getDbSensor = function(id){
    return $http.get('/api/db/sensor/'+id);
  };

  factory.setActuatorValue = function(actuatorId, value){
    return $http.post('/api/realtime/actuator/', { id : actuatorId , value : value });
  }

  return factory;
});

angular.module('ioEApp').factory('rulesFactory',function($http){
  var factory = {};

  factory.getRules = function(){
    return $http.get('/api/rules');
  };

  factory.getTriggers = function(){
    return $http.get('/api/triggers');
  }

  factory.getActions = function(){
    return $http.get('/api/actions');
  }

  factory.createRule = function(rule){
    return $http.post('/api/rules',{triggerId : rule.triggerId, actionId : rule.actionId});
  }

  factory.deleteRule = function(ruleId){
    return $http.delete('/api/rules/'+ruleId);
  }

  return factory;

});