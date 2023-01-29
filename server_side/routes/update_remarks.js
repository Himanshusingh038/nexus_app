const pool = require("../dbconn");

module.exports = async (req, res) => {
  try {
    const { card_id, remarks } = req.body;
    if (card_id == null || remarks == null) {
      res.status(500).json({ status: "failed" });
    } else {
      sql = `update cards set remarks='${remarks}' where card_id=${card_id} returning *`;
      var data = await pool.query(sql);
      console.log(data.rows[0].card_id, data.rows[0].remarks);
      const row = data.rowCount;
      if (row > 0) {
        res.status(200).json({ status: "success" });
      } else {
        res.status(500).json({ status: "failed" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
