const pool = require("../dbconn");

module.exports = (req, res) => {
  const { card_id, action } = req.query;
  console.log('unassigned cards backend');
  sql = `select * from cards where card_id = '${card_id}'`;
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.rowCount == 0) {
      res.status(400).send("id not found");
    }
  });
  if (action == "activate") {
    sql = `update cards set card_status='active' where card_id='${card_id}' returning *`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
      res.status(200).send("activated");
    });
  } else if (action == "deactivate") {
    sql = `update cards set card_status='inactive' where card_id='${card_id}' returning *`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
      res.status(200).send("deactivated");
    });
  } else if (action == "delete") {
    console.log("delete_cards");
    sql = `delete from cards where card_id='${card_id}' returning *`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
      res.status(200).json({ message: "deleted" });
    });
  }
};
