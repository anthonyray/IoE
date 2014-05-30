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

			if (sensor.length < limit){
        for (var i = sensor.length - 1 ; i >= 0 ; i--){
          labels.push($filter('date')( sensor[i].date, 'H:mm' ));
          values.push(sensor[i].numericValue);
        }
			}
			else {

				for (var i = limit - 1 ; i >= 0 ; i--){
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
				pointDot : true,
				scaleOverlay : true,

			}
		});
  	}

  	init();
  });
