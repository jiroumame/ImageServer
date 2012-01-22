var fs = require('fs');

var reader = fs.createReadStream('./img/1.png');
var writer = fs.createWriteStream('./img/2.png');
var buffPos = 0,
    buffNext = 0,

reader.on('data',function(d){
	ar.push(d);
	console.log('data');
})
.on('end',function(){
	writer.write(new Buffer(ar));
});
