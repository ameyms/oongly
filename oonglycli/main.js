var nopt  = require('nopt')
  , net = require('net')
  , querystring = require('querystring')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , url = require('url')
  , colors = require('colors');


var options
,	op
,	ip
,	port
,	file
,	remotepath
,	cmd;

var knownOpts = { 
  'ip' : String
, 'host' : String
, 'port' : Number
, 'op': String
, 'file' : path
, 'remotepath':path
, 'cmd':String
};

options = nopt(knownOpts, {}, process.argv, 2);

port = options.port || 8080;
ip = options.ip || options.host || 'localhost';
op = options.op;
file = options.file;
remotepath = options.remotepath;
cmd = options.cmd;


console.log(options);

if(op === 'upload')
{
	try
	{
		if(file && remotepath)
		{
			var uploader = require('./uploader.js').createUploader(ip, port);
			uploader.upload(file, remotepath);
		}
		else
		{
			console.log('Please specify all command line options');
		}
	}
	catch(nfe)
	{
		console.log('ERROR'.red.inverse+' Upload failed!'.red)
	}
}

if(op === 'download')
{
	if(file && remotepath)
	{
		var downloader = require('./downloader.js').createDownloader(ip, port);
		downloader.download(file, remotepath);
	}
	else
	{
		console.log('Please specify all command line options'.magenta);
	}
}
if(op === 'cmd')
{
	var p
	,	temp
	,	cmdAt = -1;

	for(p = 0; p < process.argv.length; p++)
	{
		if(process.argv[p] === '--op' && process.argv[p+1] === 'cmd' && p+2 < process.argv.length)
		{
			cmdAt = p+2;
			break;
		}
	}

	if(cmdAt>0)
	{
		var cmdArgs = Array.prototype.slice.call(process.argv, cmdAt, process.argv.length);

		for(p = 0; p< cmdArgs.length; p++)
		{
			if(cmdArgs[p].indexOf(' ') >=0 )
			{
				temp = cmdArgs[p];
				cmdArgs[p] = '\"'+temp+'\"';
			}
		}

		var executer = require('./exec.js').createExecuter(ip, port);
		executer.exec(cmdArgs);
	}
	else
	{
		console.log('Please specify command'.magenta);
	}
	
}