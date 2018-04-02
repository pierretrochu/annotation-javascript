var express = require ('express');
var router = express.Router();
var path = require('path'); //built in path module, used to resolve paths of relative files

router.get('/', function (req, res) {
  res.sendFile('/Annotationsample.html', { root: "./"}); //send html file named
  })

router.get('/testers', function (req, res) {
    res.sendFile('/file.html', { root: "./testers"}) //send html file named
});
module.exports = router;
