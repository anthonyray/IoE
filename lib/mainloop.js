var db = require('../data/models/sensorvalue');
var async = require('async');

module.exports.start = function(vh){

	setInterval(function(){
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
						callback(null);
					}
				});
			},
			function(err){
			if(err)
				console.log("Error while writing to the database ...");
		});
	}, 1500);
}
