var http = require('http')
,	nopt = require('nopt')
,	querystring = require('querystring')
,	url = require('url')
,	colors = require('colors')
,	fs = require('fs');

var options
,	port;

var knownOpts = {
	'port' : Number
};

options = nopt(knownOpts, {}, process.argv, 2);

port = options.port || 8080;



var oonglyd = http.createServer(function (req, res) {

					var body = '';
					var q = url.parse(req.url).query;
					
					var params = querystring.parse(q);
					
					try
					{
						if(params.op === 'upload')
						{
							console.log(('Request received for upload').grey);
							req.pipe(fs.createWriteStream(params.topath));
							res.end('OK');
						}
						else if(params.op === 'download')
						{
							console.log(('Request received for download').grey);
							fs.createReadStream(params.file).pipe(res);
							
						}
						else 
						{
							console.log(('Invalid request. Ignoring.').yellow);
						}
					}
					catch(nfe)
					{
						throw nfe;
					}

				}).listen(port);