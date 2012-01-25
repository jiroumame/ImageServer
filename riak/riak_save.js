var db = require('riak-js').getClient({host:'localhost'})
  , fs = require('fs')
  ;

fs.readFile('./1.png','binary',function(e,d){
	db.save('evidence','pilot-smith-drunk',d,{contentType:'image/png',immediateAction:'fire'});

});
