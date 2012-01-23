var db = require('riak-js').getClient({host:'localhost'});

db.save('hoge','fuga','piyopiyo');

