var http = require('http')
    ,fs = require('fs')
    ,formParser = require('./formParser').formParser
    ,server = http.createServer();

var body = "<form action='/' method='post' enctype='multipart/form-data'> <input type='file' name='f' /><input type='submit' value='send' /></form>";

var result_json = "'response':{'result_code':'1','result':{}}";
var data = null;
var wirter = null;

server.on('request',function(req,res){
	//リクエストくるところ
	if(req.method === 'GET'){
		//get されたらフォーム返す
		res.writeHead(200,{
			'Content-Length':body.length
			,'Content-Type':'text/html'
			});
		res.write(body);
	}
	if(req.method === 'POST'){
		//post されたら結果を返す
		req.on('data',function(d){
			console.log('data');
		});
		req.on('end',function(){
		});
		var obj = new formParser(req);
		obj.parse(req);

		console.log(obj.boundary);
		res.writeHead(202,{
			'Content-Length':result_json.length
			,'Content-Type':'application/json'
		});
		res.write(result_json);
	}
});
server.listen(8124);


