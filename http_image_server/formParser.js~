var fs = require('fs');

exports.formParser = function(){
	this.boundary = '';
	this.boundaryHeader = {};
	this._headerLength = 0;
	this.requestLength = 0;
	this.bufferLength = 0;
	this.fileBuffer = null;
	this.parse = function(req){
		this.requestLength = req.headers['content-length'];
		this.boundary = '--'+req.headers['content-type'].split(' ')[1].split('=')[1];
		var writer = fs.createWriteStream('./test.tanaka.png');	
			writer.on('open',function(){
			});
		var self = this;
		req.on('data',function(d){
			var length = d.length;
			self.bufferLength += length;
			if(self.bufferLength === length){
				//初回だけ
				for(var i = 0; i < length; i++){
					if(d[i] === 0x0d){
						var tmp_bound = d.toString('utf8',self._headerLength,i);
						if(tmp_bound === self.boundary){
							self._headerLength = i+2;
						}else if (tmp_bound.indexOf('Content-Disposition') >= 0){
							self._headerLength = i+2;
							self.boundaryHeader['content-disposition'] = tmp_bound.split(':')[1];
						}else if (tmp_bound.indexOf('Content-Type') >= 0){
							self._headerLength = i+2;
							self.boundaryHeader['content-type'] = tmp_bound.split(':')[1];
						}
					}
				}
				//最後のcrlf分
				self._headerLength += 2;
				self.fileBuffer = d.slice(self._headerLength,length);
				writer.write(new Buffer(d.slice(self._headerLength,length)));
			}else if(self.bufferLength == self.requestLength){
				//最後
				var tmp_bound = d.toString('utf8',(length - self.boundary.length-6),length);
				self.fileBuffer += d.slice(0,(length-self.boundary.length-6));
				console.log(length);
				console.log((length-self.boundary.length-6));
				writer.write(new Buffer(d.slice(0,(length-self.boundary.length-6))));
			}else{
				self.fileBuffer += d;
				writer.write(d);
			}
			console.log(self.bufferLength);
			console.log(self.requestLength);
			console.log((self.bufferLength == self.requestLength));
		})
		.on('end',function(){
			writer.end();
		});
	};
	console.log('FormParse');
}
