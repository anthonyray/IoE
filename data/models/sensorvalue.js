var sqlite3 = require('sqlite3').verbose();
var db;

function loadSensors(cb){
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
	var sensors = [];
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		db.each("SELECT * FROM SensorValues WHERE thingId = ?",[id],function(err,row){
			sensors.push(row);
		},function(err){
			db.close();
			cb(err,sensors);
		})
	});
}

function saveValue(thing,cb){
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		var stmt = db.run("INSERT INTO SensorValues VALUES (?,?,?,?)",[thing.get_hardwareId(),Date.now(),thing.get_currentValue()],function(err){
			cb(err);
		});
		
	});
}

module.exports.loadSensors = loadSensors;
module.exports.loadSensor = loadSensor;
module.exports.saveValue = saveValue;