var util = require('util'),
    amqp = require('amqp');

var con = amqp.createConnection({
	host:'localhost'
});
con.on('ready',function(){
	//con.publish('usako','hi! usako');
	con.publish('usako','hi! usako222');
	setTimeout(function(){
		con.end();
	},1000);
});
