const pool = require("../dbconn");

module.exports = async (req, res) => {
  try {
    const cst_id = req.params.cst_id;
    console.log(cst_id);
    sql = `select * from customers where customer_id='${cst_id}'`;
    var data = await pool.query(sql);
    const row = data.rows;
    res.status(200).json({ total_cst: row });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cst not found" });
  }
};
