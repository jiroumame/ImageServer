var db = require('riak-js').getClient({host:'localhost'})
  , fs = require('fs')
  ;
db.remove('evidence','pilot-smith-drunk');

