var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'message'
});
 
connection.connect();
 
module.exports = connection


 
//connection.end();