const mysql = require('mysql');
module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass@123',
  database: 'nexusDB'
});
