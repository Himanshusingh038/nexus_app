const pool = require("../dbconn");

module.exports = (req, res) => {
  var { card_count } = req.body;
  var status = "failed";
  var ans = [];
  while (card_count--) {
    let card_num = Math.floor(Math.random() * 10000);
    console.log(card_num);
    sql = `INSERT INTO cards(card_unique_id,card_status) values(${card_num},'unassigned') returning *`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      status = "success";
      ans.push(results.rows[results.rows.length - 1]);
      res.write(JSON.stringify(ans[0]));
    });
  }
  res.status(200).send();
};
