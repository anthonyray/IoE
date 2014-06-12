var server = require('./app');
var VirtualHub = require('./lib/virtualhub');
var MainLoop = require('./lib/mainloop');


var vh = new VirtualHub();
vh.init(function(){
	console.log("[VIRTUALHUB] VirtualHub initialized :)");
	vh.listen();
	
	console.log('[API] Server running on port ',9000);
	MainLoop.initRules(vh,function(){
		MainLoop.start(vh);
		server(vh,MainLoop).app.listen(9000);
	});
});
