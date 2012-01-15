var http = require('http')
    ,fs = require('fs')
    ,server = http.createServer();

var body = "<form action='/' method='post' enctype='multipart/form-data'> <input type='file' name='f' /><input type='submit' value='send' /></form>";

var result_json = "'response':{'result_code':'1','result':{}}";
var img_data_cnt = 0;

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
		var contentTypehead = req.headers['content-type'];
		var contentType = contentTypehead.split(' ')[0];
		var boundary = '--'+ contentTypehead.split(' ')[1].split('=')[1];
		req.on('data',function(d){
			var cr_cnt = 0;
			var img_data = null;
			for(var i = 0; i < d.length; i++){
				if(d[i] === 0x0d){
				cr_cnt++;
				if(cr_cnt != 4) continue;
				var tmp_bound = d.toString('utf8',0,i);
				img_data = d.slice(i,d.length);
					if(tmp_bound.indexOf(boundary) >= 0 ){
						//此処からboundary
						var spl = tmp_bound.split('\r\n');
						console.dir(spl);
						break;
					} 
				}
			}
			writer.write(img_data);
		});
		req.on('end',function(){
			console.log('writer close');
			writer.end();
		});
		res.writeHead(202,{
			'Content-Length':result_json.length
			,'Content-Type':'application/json'
		});
		res.write(result_json);
	}
});
server.on('connection',function(socket){
	console.log('connection');
	writer = fs.createWriteStream('./test.png');
});
server.listen(8124);


