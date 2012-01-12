var net = require('net')
  , fs = require('fs');
var client = net.connect(8124,function(){
});
client.on('connect',function(){
		fs.readFile('./imgserver/public/images/tes.jpg',function(err,data){
			client.write(data);
});

});
