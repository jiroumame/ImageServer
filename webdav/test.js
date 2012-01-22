var webdav = require('./WebDAVClient.js');

var obj = new webdav();

obj.putFile('./1.png',{
	host:'192.168.0.31'
	,port:80
	,path : '/dav/6.png'
});
obj.getFile('./5.png',{
	host: '192.168.0.31'
	,port : 80
	,path : '/dav/4.png'
});
