var im = require('imagemagick');
var EventEmitter = require('events').EventEmitter;

var ImageMagick = module.exports = function(inputDir,outputDir){
	this.inputDir = inputDir;
	this.outputDir = outputDir;
};
ImageMagick.prototype = new EventEmitter;
ImageMagick.prototype.resize = function(inputFileName,outputFileName,size,mimeType){
	var self = this;
	//今回は正方形が前提なのでsizeしか取らない
	im.resize({
		srcPath : this.inputDir + inputFileName
		, dstPath : this.outputDir + outputFileName
		, width :size 
		, height :size 
	},function(er,stdout,stderr){
		if(er) throw er;
		self.emit('end');
	});
};
