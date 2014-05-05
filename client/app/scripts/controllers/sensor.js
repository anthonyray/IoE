'use strict';

angular.module('ioEApp')
  .controller('SensorCtrl', function ($scope,$routeParams,sensorsFactory,$filter) {
  	$scope.sensorId = $routeParams.sensorId;

  	function init(){
		sensorsFactory.getLiveSensor($scope.sensorId).success(function(sensor){
			$scope.liveSensor = sensor;
		});

		sensorsFactory.getDbSensor($scope.sensorId).success(function(sensor){
			$scope.dbSensor = sensor;
			
			var labels = [];
			var values = [];

			sensor.forEach(function(row){
				labels.push($filter('date')( row.date, 'H:mm' ));
				values.push(row.numericValue);
			});

			$scope.charts = {
				labels : labels,
				datasets : [
        			   {
          	            fillColor : "rgba(230, 126, 34,0.5)",
          	            strokeColor : "rgba(230, 126, 34,0)",
          	            pointColor : "rgba(151,187,205,0)",
          	            pointStrokeColor : "#e67e22",
          	            data : values
          	        }
          	    ] 
			}

			$scope.options = {
				scaleShowLabels : false,
				scaleShowGridLines : false,
				pointDot : false
			}
		});
  	}

  	init();
  });



