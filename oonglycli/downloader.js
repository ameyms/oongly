var querystring = require('querystring')
,	http = require('http')
,	fs = require('fs');

 var Downloader = function(ip, port)
{
	this.ip = ip;
	this.port = port;


}


Downloader.prototype.download = function(topath, remotepath)
{
	var self = this;
	var params = querystring.stringify({
				'op'		: 'download'
   		,		'file' 	: remotepath
	});

	http.get({host:self.ip, port:self.port, path:'/?'+params, agent:false}, function (res) {
  		res.pipe(fs.createWriteStream(topath));
	});
}

exports.createDownloader = function(host, port)
{
	return new Downloader(host, port);
}