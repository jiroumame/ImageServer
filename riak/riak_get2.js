var db = require('riak-js').getClient({host:'localhost'});

db.get('hoge','fuga',function(e,d,meta){
	console.log(d);
});
