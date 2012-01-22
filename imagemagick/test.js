var img = require('./imagemagick.js');
var obj = new img('./','./');
obj.resize('1.png','fuga.png',200,'image/png');
obj.on('end',function(){
	console.log('end');
});
