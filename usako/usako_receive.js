var sys = require('util'),
    amqp = require('amqp');

var con = amqp.createConnection({
	host:'localhost'
});
con.on('ready',function(){
	var queue = con.queue('usako',{exclusive:true});
	queue.on('queueDeclareOk',function(args){
		queue.bind('#');
		queue.subscribe(function(m){
			console.log(m);
		});

	});
});
console.log('usako_receiver');
