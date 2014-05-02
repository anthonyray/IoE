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


function saveValue(sensorId,value,cb){
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		var stmt = db.prepare("INSERT INTO SensorValues VALUES (?,?,?,?,?,?,?,?,?,?)");
		stmt.run([sensorId,sensorId],function(err){
			db.close();
			cb(err);
		});
	});
}


module.exports.loadSensors = loadSensors;
module.exports.saveValue = saveValue;