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
	try
	{
		var params = querystring.stringify({
					'op'		: 'download'
	   		,		'file' 	: remotepath
		});

		http.get({host:self.ip, port:self.port, path:'/?'+params, agent:false}, function (res) {
	  		res.pipe(fs.createWriteStream(topath));
	  		res.on('error', function(err))
	  		{
	  			self.indicateError(err);
	  		}
		});
	}
	catch(nfe)
	{
		self.indicateError(nfe);
	}
}

Downloader.prototype.indicateError = function(err)
{
	console.log('ERROR'.inverse.bold.red+('Download failed. '+err).red);
	process.exit(2);
}
exports.createDownloader = function(host, port)
{
	return new Downloader(host, port);
}