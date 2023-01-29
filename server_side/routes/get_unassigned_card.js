const pool = require("../dbconn");

module.exports = (req, res) => {
  sql = `select 
            c.card_id id,
            c.card_unique_id card_no,
            c.card_views as views,
            c.website custom_url,
            c.card_status status,
            c.card_reg_date reg_date,
            ROUND(date_part('epoch', c.card_reg_date)) regg_date,
            c.remarks
        from cards c
            where  c.card_status='unassigned'
            order by c.card_reg_date desc`;
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
