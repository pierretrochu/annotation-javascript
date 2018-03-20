var http = require("http");
var port = process.env['PORT'] || 8080
var url = require('url');


var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(req.url);
    res.end();
}).listen(port);
console.log("Server ready to accept requests on port %d", port);
