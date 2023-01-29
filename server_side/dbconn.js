const Pool = require('pg').Pool
module.exports= new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nexusDB',
  password: 'pass@123',
  port: 5432,
})
