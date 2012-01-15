var sys = require('util'),
    amqp = require('amqp');
var implOpts = {
  defaultExchangeName: 'amq.topic'
};
var con= amqp.createConnection({
	host:'localhost'
},implOpts);

var con_cnt = 0;
con.on('ready',function(){
	con_cnt++;
	console.log(con.serverProperties.product);
	
	var e = con.exchange();
	var q = con.queue('test',{exclusive:true});
	q.on('queseDeclareOk',function(args){
		console.log('queue open ');
		q.bind(e,'#');
		q.on('queueBindOk',function(){
			console.log('bind');
			e.publish('test_key',{hello:'world'});
			con.end();
		});
	});
});
con.on('close',function(){
	if(con_cnt < 3) con.reconnect();
});
