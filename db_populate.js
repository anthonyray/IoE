var sqlite3 = require('sqlite3').verbose();
var conf = require('./conf.js');

var db = new sqlite3.Database('./data/'+conf.DBName);

db.serialize(function(){
	db.run("INSERT INTO Actions VALUES (null, 'YRGBLED1-199C1.colorLed1','BLUE' )");
	db.run("INSERT INTO Actions VALUES (null, 'YRGBLED1-199C1.colorLed1','RED' )");
	db.run("INSERT INTO Actions VALUES (null, 'YRGBLED1-199C1.colorLed1','GREEN' )");
	db.run("INSERT INTO Actions VALUES (null, 'YRGBLED1-199C1.colorLed1','ORANGE' )");
	db.run("INSERT INTO Actions VALUES (null, 'YRGBLED1-199C1.colorLed2','BLUE' )");
	db.run("INSERT INTO Actions VALUES (null, 'YRGBLED1-199C1.colorLed2','RED' )");
	db.run("INSERT INTO Actions VALUES (null, 'YRGBLED1-199C1.colorLed2','GREEN' )");
	db.run("INSERT INTO Actions VALUES (null, 'YRGBLED1-199C1.colorLed2','ORANGE' )");
	db.run("INSERT INTO Actions VALUES (null, 'YD096X16-186AC.display','Test lol' )");
	db.run("INSERT INTO Actions VALUES (null, 'YD096X16-186AC.display','Test trolololol' )");

	db.run("INSERT INTO Triggers VALUES (null, 'METEOMK1-1DB2A.temperature','>',28)");
	db.run("INSERT INTO Triggers VALUES (null, 'LIGHTMK1-1E62D.lightSensor','<',100)");

	db.run("INSERT INTO Rules VALUES (null,1,1)");
	db.run("INSERT INTO Rules VALUES (null,1,5)");
	db.run("INSERT INTO Rules VALUES (null,2,2)");
	db.run("INSERT INTO Rules VALUES (null,2,3)");
	db.run("INSERT INTO Rules VALUES (null,1,9)");
	db.run("INSERT INTO Rules VALUES (null,2,10)");

});

db.close();
