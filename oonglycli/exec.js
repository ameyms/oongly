
var querystring = require('querystring')
,	http = require('http')
,	colors = require('colors')
,	fs = require('fs');

 var Executer = function(ip, port)
{
	this.ip = ip;
	this.port = port;


}


Executer.prototype.exec = function(cmd)
{
	var self = this;
	var params = querystring.stringify({
			'op'		: 'cmd'
   		,	'cmd' 	: cmd.join(' ')
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
				    	if(chunk === '@@!FAIL!@@')
				    	{
				    		console.log(('Remote command execution FAILED').red);
				    		process.exit(3);
				    	}
				    	else
				    	{
				    		console.log(chunk.cyan);
				    	}
				});

		});
		req.on('error', function(err)
		{
			console.log(('ERROR'.inverse.bold+' Remote command execution failed!').red);
			console.log((err+'').red)
			process.exit(3);
		});

		req.write("");
		req.end();
	}
	catch(nfe)
	{
		console.log('ERROR'.inverse.bold.red+' Remote command execution failed!'.red)
		console.log((nfe+'').red)
		process.exit(3);
	}

	
}

exports.createExecuter = function(host, port)
{
	return new Executer(host, port);
}