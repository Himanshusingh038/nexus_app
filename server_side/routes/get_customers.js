const pool = require("../dbconn");

module.exports = (req, res) => {
  console.log("getcustomers");
  sql = ` select customer_id id,
                  customer_num cust_id,
                  customer_name as name,
                  customer_email email,
                  customer_mobile phone,
                  customer_reg_date reg_date,
                  ROUND(UNIX_TIMESTAMP(customer_reg_date )) regg_date 
              from customers
              order by lower(customer_name)`;
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results);
  });
};
