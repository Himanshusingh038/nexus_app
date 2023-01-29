var pool = require("../dbconn");

module.exports = (req, res) => {
  console.log("all cards");
  url = `select c.card_id id,
            c.card_unique_id card_no,
            c.card_views as views,
            c.website custom_url,
            c.card_status status,
            c.card_reg_date reg_date,
            c.remarks,
            cs.customer_name  c_name,
            cs.customer_email c_email,
            cs.customer_mobile c_phone
        from customers as cs 
            join cards c on
                cs.customer_num=c.cst_unique_id limit 10`;
  pool.query(url, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
