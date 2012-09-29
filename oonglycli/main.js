var nopt  = require('nopt')
  , net = require('net')
  , querystring = require('querystring')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , url = require('url')


var options
,	op
,	ip
,	port
,	file
,	remotepath
,	cmd;

var knownOpts = { 
  'ip' : url
, 'port' : Number
, 'op': String
, 'file' : path
, 'remotepath':path
, 'cmd':String
};

options = nopt(knownOpts, {}, process.argv, 2);

port = options.port || 8080;
ip = options.ip || 'localhost';
op = options.op;
file = options.file;
remotepath = options.remotepath;
cmd = options.cmd;



if(op === 'upload')
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

if(op === 'download')
{
	if(file && remotepath)
	{
		var downloader = require('./downloader.js').createDownloader(ip, port);
		downloader.download(file, remotepath);
	}
	else
	{
		console.log('Please specify all command line options');
	}
}