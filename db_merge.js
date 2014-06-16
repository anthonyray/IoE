var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/db.db');

db.serialize(function(){
	db.run("attach 'data/newdb.db' as toMerge");
	db.run("BEGIN");
	db.run("insert into SensorValues select * from toMerge.SensorValues");
	db.run("COMMIT");
});

db.close();
