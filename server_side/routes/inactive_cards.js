var pool = require("../dbconn");

module.exports = (req, res) => {
  sql = `SELECT
      c.card_id AS id,
      c.card_unique_id AS card_no,
      c.card_views AS views,
      c.website AS custom_url,
      c.card_status AS status,
      c.card_reg_date AS reg_date,
      UNIX_TIMESTAMP(c.card_reg_date) AS regg_date,
      c.remarks,
      cs.customer_name AS c_name,
      cs.customer_email AS c_email,
      cs.customer_mobile AS c_phone
    FROM
      cards c
      INNER JOIN customers cs ON c.cst_unique_id = cs.customer_num AND c.card_status = 'inactive'
    ORDER BY
      cs.customer_name`;
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results);
  });
};
