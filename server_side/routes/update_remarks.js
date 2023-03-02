const pool = require("../dbconn");

module.exports = async (req, res) => {
  console.log('update remark');
  try {
    const { card_id, remarks } = req.body;
    if (card_id == null || remarks == null) {
      res.status(500).json({ status: "failed" });
    } else {
      sql = `update cards set remarks='${remarks}' where card_id='${card_id}'`;
      console.log(sql);
      var data = await pool.query(sql);
      pool.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);
        if (result.affectedRows > 0) {
          res.status(200).json({ status: "success" });
        } else {
          res.status(500).json({ status: "failed" });
        }
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
