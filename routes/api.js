/*
* Initialization
*/
module.exports = function(vh){

	var express = require('express');
	var router = express.Router();
	var db = require('../data/models/sensorvalue');

	/* Realtime values */ 

	router.get('/api/realtime/sensors',function(req,res){
		var test = [];
	 	vh.things.forEach(function(thing){
	    if(thing.get_currentValue)
	      test.push({id : thing.get_hardwareId(), date : Date.now() ,numericValue : thing.get_currentValue() });
	  	});
	  res.json(test);
	});

	router.get('/api/realtime/sensor/:id',function(req,res){
		
		var result = vh.things.filter(function(thing){
			return (thing.get_hardwareId() == req.params.id);
		});
		if (result.length > 0){
			var thing = { id : result[0].get_hardwareId(), date : Date.now(), numericValue : result[0].get_currentValue() }
			res.json(thing);
		}
		else
		{
			res.json([]);
		}
	});

	/* DB values */

	router.get('/api/db/sensors',function(req,res){
		db.loadSensors(function(err,sensors){
			if (err){
				console.log(err);
				res.json([]);
			}
			else {
				res.json(sensors);
			}

		});
	});

	router.get('/api/db/sensor/:id',function(req,res){
		db.loadSensor(req.params.id,function(err,sensors){
			if (err){
				console.log(err);
				res.json([]);
			}
			else {
				res.json(sensors);
			}

		});
	});

	return {router : router};



}
