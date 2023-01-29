var pool = require("../dbconn");

module.exports = (req, res) => {
  sql = `SELECT 
            c.card_id id,
            c.card_unique_id card_no,
            c.card_views as views,
            c.website custom_url,
            c.card_status status,
            c.card_reg_date reg_date,
            date_part('epoch', c.card_reg_date) regg_date,
            c.remarks,
            cs.customer_name  c_name,
            cs.customer_email c_email,
            cs.customer_mobile c_phone 
        FROM cards c
            INNER JOIN customers cs on 
                c.cst_unique_id=cs.customer_num and 
                c.card_status='inactive'
                order by cs.customer_name`;
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
