// Require modules
var express = require('express'); //express module must be installed using NPM
var app = express(); //create app
var router = express.Router();
var path = require('path'); //built in path module, used to resolve paths of relative files
var port = 8080 //stores port number to listen on

app.use(express.static(path.join(__dirname + '/testers/file.html'))); //allows html file to reference stylesheet that is stored in ./css directory
app.use(express.static(path.join(__dirname + '/css'))); //allows html file to reference stylesheet that is stored in ./css directory
app.use(express.static(path.join(__dirname + '/js'))); //allows html file to reference js
app.use('/', router);


router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Annotationsample.html')); //send html file named
  })

router.get('/testers', function (req, res) {
    res.sendFile(path.join(__dirname + '/testers', 'file.html')); //send html file named
    })




app.listen(port);//listen for network traffic on port specified by port variable

console.log("Now listening on port " + port); //write to the console which port is being used
