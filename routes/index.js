var express = require('express');
var router = express.Router();
const connection = require('./../config/mysql')





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
