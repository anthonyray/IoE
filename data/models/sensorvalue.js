var sqlite3 = require('sqlite3').verbose();

function listSensors(cb){
	var db;
	var sensors = [];
	db = new sqlite3.Database('./data/db.db');
	db.each("SELECT thingId FROM SensorValues GROUP BY thingId;",function(err,row){
			sensors.push(row);
		},function(err){
			db.close();
			cb(err,sensors);
		});
}

function loadSensors(cb){
	var db;
	var sensors = [];
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		db.each("SELECT * FROM SensorValues", function(err, row) {
      		sensors.push(row);
  		},function(err){
  			db.close();
  			cb(err,sensors);
  		});
	});
}

function loadSensor(id,cb){
	var db;
	var sensors = [];
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		db.each("SELECT * FROM SensorValues WHERE thingId = ?;",[id],function(err,row){
			sensors.push(row);
		},function(err){
			db.close();
			cb(err,sensors);
		})
	});
}

function saveValue(thing,cb){
	var db;
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		var stmt = db.run("INSERT INTO SensorValues VALUES (?,?,?,?);",[thing.get_hardwareId(),Date.now(),thing.get_currentValue()],function(err){
			db.close();
			cb(err);
		});
		
	});
}

module.exports.loadSensors = loadSensors;
module.exports.loadSensor = loadSensor;
module.exports.saveValue = saveValue;
module.exports.listSensors = listSensors;