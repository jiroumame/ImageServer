
/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
/*
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
*/
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
	res.send('このパスはつぶしとく',404);
});
//画像要求
app.get('/img/:id',function(req,res){
	res.sendfile(__dirname+'/public/images/'+req.params.id+'.jpg');
});
var test_cnt = 0;
app.get('/test',function(req,res){
	setTimeout(function(){
		test_cnt++;
		console.log('timer'+test_cnt);
	},5000);
	res.send('ok');
});
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
