var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');

db.serialize(function(){
	db.run("INSERT INTO SensorValues VALUES ('METEOMK1-1DB2A.temperature','METEOMK1-1DB2A.temperature',1234567,0,0,0,0,'0X00','0X00','')");
});

db.close();
