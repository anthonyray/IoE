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
      .when('/sensor/:sensorId',{
        templateUrl : 'views/sensor.html',
        controller : 'SensorCtrl'
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

  factory.getDbSensors = function(){
    return $http.get('/api/db/sensors');
  };

  factory.getLiveSensor = function(id) {
    return $http.get('/api/realtime/sensor/'+id);
  };          
  
  factory.getDbSensor = function(id){
    return $http.get('/api/db/sensor/'+id);
  };

  return factory;
});