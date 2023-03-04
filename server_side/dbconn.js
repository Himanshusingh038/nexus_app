const mysql = require('mysql');
module.exports = mysql.createConnection(process.env.DATABASE_URL);
