var http = require('http')
    ,fs = require('fs')
    ,cluster = require('cluster')
    ,amqp = require('amqp')
    ,rabbit_con = null
    ,formidable = require('formidable')
    ,server = http.createServer()
    ,CPU_CNT = require('os').cpus().length
    ;

//初期フォーム
var body = "<form action='/' method='post' enctype='multipart/form-data'> <input type='file' name='f' /><input type='submit' value='send' /></form>";

//サンプル結果JSON
var result_json = "'response':{'result_code':'1','result':{}}";


var request_parser=function(req,res){
	//リクエストくるところ
	if(req.method === 'GET'){
		rabbit_con.publish('usako','hogefugapiyo');
		//get されたらフォーム返す
		res.writeHead(200,{
			'Content-Length':body.length
			,'Content-Type':'text/html'
			,'Connection':'close'
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
			,'Connection':'close'
		});
		form.parse(req);
		res.write(result_json);
	}	
};

if(cluster.isMaster){
	//マスターだった場合
	for(var i = CPU_CNT; i--;){
		//CPUの数だけプロセス上げる
		cluster.fork();
	}
	cluster.on('death',function(worker){
		//プロセスが死んだ場合、再度プロセス上げる
		console.log('worker ' + worker.pid + ' died');
		cluster.fork();
	});

}else{
	console.log('worker start ');
	//ワーカーだった場合
	rabbit_con = amqp.createConnection({host:'localhost'});
	rabbit_con.on('ready',function(){
			server.on('request',request_parser);
			server.listen(8124);
	});
}
