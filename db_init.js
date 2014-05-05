var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/db.db');

db.serialize(function(){
	db.run("CREATE TABLE Things (id TEXT PRIMARY KEY, type TEXT, subType TEXT)");
	db.run("CREATE TABLE SensorValues (thingId TEXT, date INT, numericValue INT, textValue TEXT)");
});

db.close();