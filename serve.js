var server = require('./app');
var VirtualHub = require('./lib/virtualhub');
var MainLoop = require('./lib/mainloop');


var vh = new VirtualHub();
vh.init(function(){
	console.log("[VIRTUALHUB] VirtualHub initialized :)");
	vh.listen();
	server(vh).app.listen(9000);
	console.log('[API] Server running on port ',9000);
	MainLoop.start(vh);
});
