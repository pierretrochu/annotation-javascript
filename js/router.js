var express = require ('express');
var router = express.Router();
var path = require('path'); //built in path module, used to resolve paths of relative files

router.get('/', function (req, res) {
  res.sendFile('/Annotationsample.html', { root: "./"}); //send html file named
  })

router.get('/testers', function (req, res) {
<<<<<<< HEAD
    res.sendFile('/file.html', { root: "./testers"}); //send html file named
=======
    res.sendFile(path.join(__dirname + '/testers', 'file.html')); //send html file named
>>>>>>> 5e42da03c6baa9f70d2f2a9c85d10d6105a40443
    })

module.exports = router;
