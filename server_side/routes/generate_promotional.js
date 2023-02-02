const pool = require("../dbconn");

module.exports = (req, res) => {
  var { card_count } = req.body;
  var status = "failed";
  var ans = [];
  while (card_count--) {
    let card_num = Math.floor(new Date().getTime()/100).toString() + Math.floor(Math.random() *(10000)).toString();
    console.log(card_num);
    const card_id = btoa(card_num);
    sql = `INSERT INTO cards(card_id, card_unique_id,card_status) values('${card_id}',${card_num},'unassigned') returning *`;
    console.log(sql);
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
