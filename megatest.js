var server = require('./app');
var VirtualHub = require('./lib/virtualhub');
var DBLog = require('./lib/dblogger');
var vh = new VirtualHub();
vh.init();
vh.listen();

server.listen(9000);
console.log('Server running on port ',9000);

DBLog.log(vh);