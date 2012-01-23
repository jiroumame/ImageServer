var crypt = require('crypto')
  , fs = require('fs')
  ;

var password = '012345';
var encrypt = crypt.createCipher('aes-256-cbc',password);
fs.readFile('./1.png',function(e,d){
	var writer = fs.createWriteStream('./enc.png');
	writer.on('open',function(){
		var b = encrypt.update(d);
		writer.write(b,'binary');
		var c = encrypt.final();
		writer.end(c,'binary');
	});
});

