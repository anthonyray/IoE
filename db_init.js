var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/db.db');

db.serialize(function(){
	db.run("CREATE TABLE Things (id TEXT PRIMARY KEY, type TEXT, subType TEXT)");
	db.run("CREATE TABLE SensorValues (id INT PRIMARY KEY , thingId INT, date INT, luminosity INT, temp INT, humidity INT, pressure INT, rgb1 TEXT, rgb2 TEXT, display TEXT)");
});

db.close();