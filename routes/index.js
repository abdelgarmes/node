var express = require('express');
var router = express.Router();
const connection = require('./../config/mysql')





/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM message', function (error, results, fields) {
    if (error) throw error;
    console.log('messages: ', results);
    
    res.render('index', { title: 'Express', messages: results });
    
  });
});


/* POST Message. */
router.post('/', function(req, res, next) {
  console.log(req.body)
  connection.query('INSERT INTO message SET content = ?, created_at = ?', [req.body.message, new Date()], function (error, results, fields) {
    if (error) throw error;
    console.log('khorag toto The solution is: ', results);

    
  });
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
