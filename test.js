var db = require('./data/models/sensorvalue');
var async = require('async');
var VirtualHub = require('./lib/virtualhub');
var vh = new VirtualHub();
vh.init();
vh.listen();


db.loadSensors(function(err,sensors){
	if (err){
		console.log(err);
	}
	else {
		console.log(sensors);
	}

});

setInterval(function(){
	async.eachSeries(vh.things,
		function(thing, callback){
			db.saveValue(thing,function(err){
				if(err){
					console.log("ERROR WHILE SAVING ",thing.get_hardwareId());
					callback(err);
				}
				else
				{
					console.log("WRITING TO THE DB", thing.get_hardwareId());
					callback(null);
				}
			});
		},
		function(err){
		if(err)
			console.log("Error while writing to the database ...");
	});
}, 1500);