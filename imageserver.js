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
	socket.on('data',function(data){
		console.log(data);
		fs.writeFile('./imgserver/public/images/server/sample.jpg',data,function(err){
			console.log('It\'s Saved');
		});
	});
});
