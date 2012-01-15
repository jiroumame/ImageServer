var net = require('net')
  , fs = require('fs');
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });
});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});
server.on('connection',function(socket){
	console.log('socket connection');
	var writer = fs.createWriteStream('./imgserver/public/images/server/sample.png');
	writer.on('open',function(){
		socket.on('data',function(d){
			writer.write(d);
			});
		socket.on('end',function(){
			writer.end();
			console.log('It\'s Saved');
			});
	});

});
