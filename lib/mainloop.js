var db = require('../data/models/sensorvalue');
var async = require('async');

module.exports.initRules = function(vh,cb){
	db.loadInitRules(function(err,dbRules){
		if (err){
			console.log("Failed to fetch rules from the database");
			cb(err);
		}
		else {
			console.log("Fetched rules from the database succesfully");
			pushAllRules(vh.sensors,dbRules,cb)
		}
	});

}

module.exports.start = function(vh){

	setInterval(function(){
		console.time("Main Cycle");
		async.eachSeries(vh.sensors,
			function(thing, callback){
				db.saveValue(thing,function(err){
					if(err){
						console.log("ERROR WHILE SAVING ",thing.get_hardwareId());
						callback(err);
					}
					else
					{
						console.log("[DB]", thing.get_hardwareId());
						thing.setPreviousValue();
						callback(null);
					}
				});
				if (thing.checkRules) { //
					thing.checkRules(function(ruleTriggered,actuatorId,value){
						console.log("Check rules fired");
						if (ruleTriggered){
							var actuator = vh.actuators.filter(function(actuator){
								return (actuator.get_hardwareId() == actuatorId);
							});
							if(actuator.length > 0)
								actuator[0].setValue(value);
						}
					});
				}
			},
			function(err){
			if(err)
				console.log("Error while writing to the database ...");
		});
		console.timeEnd("Main Cycle");
	}, 1500);
}

function pushAllRules(sensorList, allRules, cb){
	sensorList.forEach(function(sensor){
		var sensorId = sensor.get_hardwareId();
		allRules.forEach(function(rule){
			if (rule.sensorId == sensorId) {
				sensor.pushRule(rule);
			}
		});
	});
	cb && cb();
}
