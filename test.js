var model = require('./data/models/sensorvalue');

model.loadSensors(function(err,sensors){
	if (err){
		console.log(err);
	}
	else {
		console.log(sensors);
	}
});

model.saveValue(1,1,function(err){
	if (err){
		console.log(err);
	}
	else {
		console.log('INSERTED');
	}
})