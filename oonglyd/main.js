var http = require('http')
,	nopt = require('nopt')
,	querystring = require('querystring')
,	url = require('url')
,	colors = require('colors')
,	exec = require('child_process').exec
,	fs = require('fs');

var options
,	port
,	wstream
,	execCmd;

var knownOpts = {
	'port' : Number
};

options = nopt(knownOpts, {}, process.argv, 2);

port = options.port || 8080;


var logerr = function(res, err)
{
	res.end('@@!FAIL');
	console.log(('[ERROR] '+err.bold).red);
}

var oonglyd = http.createServer(function (req, res) {

					var body = '';
					var q = url.parse(req.url).query;
					
					var params = querystring.parse(q);
					
					try
					{
						if(params.op === 'upload')
						{
							console.log(('Request received for upload').grey);

							try
							{
								wstream = fs.createWriteStream(params.topath);
								wstream.on('error', function(err)
								{
									logerr(res,err);
								});
								wstream.on('end', function(){

									res.end('OK');
								});
								req.on('error', function(err)
								{
									logerr(res,err);
								});
								req.pipe(wstream);
								
							}
							catch(fex)
							{
								logerr(res, fex);
							}

						}
						else if(params.op === 'download')
						{
							console.log(('Request received for download').grey);
							fs.createReadStream(params.file).pipe(res);
							
						}
						else if(params.op === 'cmd')
						{
							console.log(('Request received for rexec '+params.cmd.white).grey);
							execCmd = exec(params.cmd,
							  function (error, stdout, stderr) {
							   
							    if (error !== null) {
							    	res.write('@@!FAIL@@')
							      console.log('exec error: '.red + error);
							    }
							});
							execCmd.stderr.pipe(res);
							execCmd.stdout.pipe(res);
							
							
						}
						else 
						{
							console.log(('Invalid request. Ignoring.').yellow);
						}
					}
					catch(nfe)
					{
						logerr(res,nfe);
					}

				}).listen(port);