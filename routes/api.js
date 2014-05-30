/*
* Initialization
*/
module.exports = function(vh,MainLoop){

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

	router.get('/api/realtime/actuators',function(req,res){
		var test = [];
	 	vh.things.forEach(function(thing){
	    if(!thing.get_currentValue)
	      test.push({id : thing.get_hardwareId()});
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

	router.post('/api/realtime/actuator',function(req,res){
		var actuatorId = req.param('id');
		var value = req.param('value');

		var result = vh.actuators.filter(function(actuator){
			return (actuator.get_hardwareId() == actuatorId);
		});

		if ( result.length > 0 ){
			result[0].setValue(value,function(){
				console.log(value);
				res.json({success : true});
			});

		}

		else
		{
			res.json([]);
		}

	});

	/* DB values */

	router.get('/api/db/sensors',function(req,res){
		db.listSensors(function(err,sensors){
			if (err){
				console.log(err);
				res.json([]);
			}
			else {
				var sensorsList = [];
				sensors.forEach(function(sensor){
					sensorsList.push({id : sensor.thingId });
				});
				res.json(sensorsList);
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

	/*
	* Administration
	*/
	router.get('/api/rules',function(req,res){
		db.loadRules(function(err,rules){
			if (err)
				res.json({success : false});
			else
				res.json({rules : rules});
		});
	});

	router.post('/api/rules',function(req,res){
			var triggerId = parseInt(req.param('triggerId'));
			var actionId = parseInt(req.param('actionId'));

			db.saveRule(triggerId, actionId, function(err){
			if (err)
				res.json({success : false, err : err, triggerId :triggerId, actionId : actionId })
			else {
				MainLoop.initRules(vh,function(){
					res.json({success : true});
				});
			}
		});

	});

	router.delete('/api/rules/:id',function(req,res){
		var idRule = parseInt(req.params.id);
		db.deleteRule(idRule,function(err){
			if (err)
				res.json({success : false, err :err});
			else {
				MainLoop.initRules(vh,function(){
					res.json({sucess : true});
				});
			}

		});
	});


	return {router : router};
}
