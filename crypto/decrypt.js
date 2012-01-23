var crypt = require('crypto')
  , fs = require('fs')
  ;

var password = '012345';
var decrypt = crypt.createDecipher('aes-256-cbc',password);
fs.readFile('./enc.png',function(e,d){
	var writer = fs.createWriteStream('./dec.png');
	writer.on('open',function(){
		var b = decrypt.update(d);
		writer.write(b,'binary');
		var c = decrypt.final();
		writer.end(c,'binary');
	});
});
