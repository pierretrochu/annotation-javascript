// Require modules
var express = require('express'); //express module must be installed using NPM
var app = express(); //create app
var path = require('path'); //built in path module, used to resolve paths of relative files
var port = 8080 //stores port number to listen on

console.log(path.join(__dirname, 'Annotationsample.html'));
app.use(express.static(path.join(__dirname + '/css'))); //allows html file to reference stylesheet that is stored in ./css directory
app.use(express.static(path.join(__dirname + '/js'))); //allows html file to reference js

app.get('/', function(req, res) { //on html request of root directory, run callback function
    res.sendFile(path.join(__dirname, 'Annotationsample.html')); //send html file named
});


app.listen(port);//listen for network traffic on port specified by port variable

console.log("Now listening on port " + port); //write to the console which port is being used
