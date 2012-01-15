var util = require('util'),
    amqp = require('amqp');

var con = amqp.createConnection({
	host:'localhost'
});
con.on('ready',function(){
	con.publish('hello','hi! usako');
	con.publish('hello','hi! usako');
	setTimeout(function(){
		con.end();
	},1000);
});
