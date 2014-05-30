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
		try {
			var stmt = db.run("INSERT INTO SensorValues VALUES (?,?,?,?);",[thing.get_hardwareId(),Date.now(),thing.get_currentValue()],function(err){
				db.close();
				cb(err);
			});
			}
		catch (err) {
			console.log(err);
			db.close();
			cb(err);
		}
	});

}

function loadTriggers(cb){
	var db;
	var triggers = [];
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		db.each("SELECT * FROM Triggers", function(err, row) {
      		triggers.push(row);
  		},function(err){
  			db.close();
  			cb(err,triggers);
  		});
	});
}

function loadRules(cb){
	var db;
	var rules = [];
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		db.each("SELECT * FROM Rules", function(err, row) {
      		rules.push(row);
  		},function(err){
  			db.close();
  			cb(err,rules);
  		});
	});
}

function loadActions(cb){
	var db;
	var actions = [];
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		db.each("SELECT * FROM Actions", function(err, row) {
      		actions.push(row);
  		},function(err){
  			db.close();
  			cb(err,actions);
  		});
	});
}

function loadInitRules(cb){
	var db;
	var initRules = [];
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		db.each("SELECT sensorId, operator, threshold, actuatorId, value FROM Triggers, Actions, Rules WHERE triggerId = Triggers.id AND actionId = Actions.id", function(err, row) {
      		initRules.push(row);
  		},function(err){
  			db.close();
  			cb(err,initRules);
  		});
	});
}

function saveRule(triggerId, actionId, cb){
	var db;
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		var stmt = db.run("INSERT INTO Rules VALUES (null,?,?);",[triggerId,actionId],function(err){
			db.close();
			cb(err);
		});
	});
}

function saveTrigger(sensorId, operator, threshold, cb){
	var db;
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		var stmt = db.run("INSERT INTO Triggers VALUES (null,?,?,?);",[sensorId,operator,threshold],function(err){
			db.close();
			cb(err);
		});
	});
}

function deleteRule(ruleId, cb){
	var db;
	db = new sqlite3.Database('./data/db.db');
	db.serialize(function(){
		var stmt = db.run("DELETE FROM Rules WHERE id=(?);",[ruleId],function(err){
			db.close();
			cb(err);
		});
	});
}


function deleteTrigger(triggerId, cb){
	var db;
	db = new sqlite3.Database('./data/db.db');
	var stmt = db.get("SELECT * FROM Rules WHERE triggerId=(?);",[triggerId],function(err, row) {
		console.log(row);
		if ( row != undefined ) {
				db.close();
				cb("conflict");
		}
		else {
			db.serialize(function(){
				stmt = db.run("DELETE FROM Triggers WHERE id=(?);",[triggerId],function(err){
					db.close();
					cb(err);
				});
			});
		}
  	});
}

module.exports.loadSensors = loadSensors;
module.exports.loadSensor = loadSensor;
module.exports.saveValue = saveValue;
module.exports.listSensors = listSensors;
module.exports.loadTriggers = loadTriggers;
module.exports.loadRules = loadRules;
module.exports.loadActions = loadActions;
module.exports.saveRule = saveRule;
module.exports.saveTrigger = saveTrigger;
module.exports.deleteRule = deleteRule;
module.exports.deleteTrigger = deleteTrigger;
module.exports.loadInitRules = loadInitRules;
