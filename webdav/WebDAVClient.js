var http = require('http')
  , fs = require('fs')
  , EventEmitter = require('events').EventEmitter
  ;

var WebDAVClient = module.exports = function(){};
WebDAVClient.prototype.putFile = function(filePath,opts){
	opts.method = 'PUT';
	fs.readFile(filePath,function(e,d){
		var req = http.request(opts,function(res){
		});
		req.write(d);
		req.end();
	});
};
WebDAVClient.prototype.getFile = function(filePath,opts){
	var writer = fs.createWriteStream(filePath);
	writer.on('open',function(fd){
		http.get(opts,function(res){
				if(res.statusCode != 200){
					//error
					writer.end();
				}
				res.on('data',function(chunk){
					writer.write(chunk);
				}).on('end',function(){
					writer.end();
				});;
		});
	});
};

