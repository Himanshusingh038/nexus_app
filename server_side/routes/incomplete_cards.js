const pool = require("../dbconn");
module.exports = (req, res) => {
  sql = `SELECT * from cards c
                INNER JOIN customers cst on 
                c.cst_unique_id=cst.customer_num and 
                c.card_status!='active'`;
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results);
  });
};
