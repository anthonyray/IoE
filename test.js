var server = require('./app');
var VirtualHub = require('./lib/virtualhub');
var MainLoop = require('./lib/mainloop');


var vh = new VirtualHub();
vh.init(function(){
  console.log("[VIRTUALHUB] VirtualHub initialized :)");
  vh.listen();
  MainLoop.initRules(vh,function(){
    console.log("[Rules] Rules initialized");
    //console.log(vh.sensors[1]);
    MainLoop.start(vh);
    server(vh,MainLoop).app.listen(9000);
    console.log('[API] Server running on port ',9000);
  });
});

/*
var db = require('./data/models/sensorvalue');

db.loadInitRules(function(err,triggers){
  console.log(triggers);
});
*/
