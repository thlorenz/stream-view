'use strict';
var http =  require('http')
  , fs   =  require('fs')
  , path =  require('path')
  , build = require('./build')
  , client = path.join(__dirname, '..', 'client')

function serveError (res, err) {
  console.error(err);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end(err.toString());
}

function serveIndex (res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream(path.join(client, 'index.html')).pipe(res); 
}

function serveBundle (res) {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  build().pipe(res);
}

function serveCss (res) {
  res.writeHead(200, { 'Content-Type': 'text/css' });
  fs.createReadStream(path.join(client, 'css', 'index.css')).pipe(res); 
}

var go = module.exports = function (db, cb) {
  var server = http.createServer(function (req, res) {
    console.log('%s %s', req.method, req.url);
    if (req.url === '/') return serveIndex(res);
    if (req.url === '/main.js') return serveBundle(res);
    if (req.url === '/css/index.css') return serveCss(res);
    res.writeHead(404);
    res.end();
  });

  server.on('listening', function (address) {
    var a = server.address();
    cb(null, a);
  });
  server.listen(3000);
};
