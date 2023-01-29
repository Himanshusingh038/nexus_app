var pool = require("../dbconn");

module.exports = (req, res) => {
  sql = `select 
            c.card_id id,
            c.card_unique_id card_no,
            c.card_views as views,
            c.website custom_url,
            c.card_status status,
            c.card_reg_date reg_date,
            round(date_part('epoch', c.card_reg_date)) regg_date,
            c.remarks,
            cs.customer_name  c_name,
            cs.customer_email c_email,
            cs.customer_mobile c_phone 
        from cards c
            INNER JOIN customers cs on 
                c.cst_unique_id=cs.customer_num and 
                c.card_status='active'
                order by cs.customer_name`;
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
