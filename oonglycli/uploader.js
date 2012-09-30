
var querystring = require('querystring')
,	http = require('http')
,	colors = require('colors')
,	fs = require('fs');

 var Uploader = function(ip, port)
{
	this.ip = ip;
	this.port = port;


}


Uploader.prototype.upload = function(file, as)
{
	var self = this;
	var params = querystring.stringify({
			'op'		: 'upload'
   		,	'topath' 	: as
	});

	var options = {
	  host: self.ip,
	  port: self.port,
	  path: '/?'+params,
	  method: 'POST'
	};
	try
	{
		var req = http.request(options, function(res) {

				  res.setEncoding('utf8');
				  res.on('data', function (chunk) {
				    	if(chunk === 'OK')
				    	{
				    		console.log(('Upload completed successfuly').green);
				    	}
				    	else if(chunk === 'FAIL')
				    	{
				    		console.log(('Upload FAILED').red);
				    	}
				});

		});
		req.on('error', function(err)
		{
			console.log(('ERROR'.inverse.bold+' Upload failed!').red);
		});

		fs.readFile(file, function (err, data) {
		  if (err) throw err;
		 
		  req.write(data);
		  req.end();
		});
	}
	catch(nfe)
	{
		console.log('ERROR'.inverse.bold.red+' Upload failed!'.red)
	}

	
}

exports.createUploader = function(host, port)
{
	return new Uploader(host, port);
}