var db = require('riak-js').getClient({host:'localhost'})
  , fs = require('fs')
  ;

db.get('evidence','pilot-smith-drunk',function(e,d,meta){
	fs.writeFile('./2.png',d);
});
