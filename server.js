var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080


/*
function send404Response(response) {
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write('Error 404 - sorry the page was not found!');
  response.end();
  }

function onRequest(request, response) {
  if (request.method == 'GET') {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream("/Annotationsample.html").pipe(response);
    console.log("This is the last thing dude...")
}
    else {
    send404Response(response);
  }
}

http.createServer(onRequest).listen(8080);
*/
