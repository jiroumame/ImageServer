var http = require('http')
    ,fs = require('fs')
    ,formidable = require('formidable')
    ,server = http.createServer();

//初期フォーム
var body = "<form action='/' method='post' enctype='multipart/form-data'> <input type='file' name='f' /><input type='submit' value='send' /></form>";

//サンプル結果JSON
var result_json = "'response':{'result_code':'1','result':{}}";

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
		var form = new formidable.IncomingForm(),
		    files = [],
		    fields = [];
		form.uploadDir = './';
		form.on('field',function(key,val){
			console.log(key,val);
			fields.push([key,val]);
		})
		.on('file',function(key,file){
			console.log(key,file);
			files.push([key,file]);
		})
		.on('end',function(){
			console.log('upload done');
		});
		res.writeHead(202,{
			'Content-Length':result_json.length
			,'Content-Type':'application/json'
		});
		form.parse(req);
		res.write(result_json);
	}
});
server.on('connection',function(socket){
	console.log('connection');
});
server.listen(8124);


