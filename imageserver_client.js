var net = require('net')
  , fs = require('fs');
var client = net.connect(8124,function(){
});
client.on('connect',function(){
		var read = fs.createReadStream('./1.png');
		read.on('open',function(){
console.log('opne');
			read.pipe(client);
		});

});
