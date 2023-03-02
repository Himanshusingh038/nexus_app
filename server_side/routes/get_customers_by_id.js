const pool = require("../dbconn");

module.exports = async (req, res) => {
  try {
    const cst_id = req.params.cst_id;
    console.log(cst_id);
    sql = `select * from customers where customer_id='${cst_id}'`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cst not found" });
  }
};
