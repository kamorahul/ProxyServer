/*
*  Proxy Server
*/
var httpProxy = require('http-proxy');
var url = require('url');
var proxy = httpProxy.createProxyServer({});

var MAPPINGS = {
    "snippetofcode.com" : {target : "http://127.0.0.1:3000"},
    "rahulmean.com" : {target : "http://127.0.0.1:3001"},
    "techideashub.com" : {target : "http://127.0.0.1:3002"}

}

proxy.on('error', function (err, req, res) {
    res.end("Something Goes Worng With Proxy Server with Error Message" +err.message);
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('remoteip', req.connection.remoteAddress);
});


function runProxyServer(req, res) {
    var hostname = req.headers.host;
    var target = MAPPINGS[hostname].target;
        proxy.web(req, res, { target: target });

}



exports.runProxy = function (req, res) {

    runProxyServer(req, res);
};
