var http = require('http')
  , fs = require('fs')
  ;

var options = {
	host:'192.168.0.31'
	,port : 80
	,path : '/dav/2.png'
};
var writer = fs.createWriteStream('./3.png');
writer.on('open',function(fd){
		http.get(options,function(res){
			console.log(res.statusCode);
			res.on('data',function(chunk){
				console.log(chunk);
				writer.write(chunk);
				})
			.on('end',function(){
				console.log('end');
				writer.end();
				});
		});
});

