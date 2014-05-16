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
			var limit = 50;
			var labels = [];
			var values = [];

			if (sensor.length < 100){
				sensor.forEach(function(row){
					labels.push($filter('date')( row.date, 'H:mm' ));
					values.push(row.numericValue);
				});
			}
			else {
				
				var count = sensor.length;
				for (var i = count-1 ; i >= (count - 1) - limit ; i--){
					labels.push($filter('date')( sensor[i].date, 'H:mm' ));
					values.push(sensor[i].numericValue);
				}
			}
			

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
				scaleShowLabels : true,
				scaleShowGridLines : false,
				pointDot : false, 
				scaleOverlay : true, 

			}
		});
  	}

  	init();
  });



