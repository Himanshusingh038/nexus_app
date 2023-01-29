const pool = require("../dbconn");

module.exports = (req, res) => {
  const { action, cst_id } = req.query;

  if (action == "activate") {
    sql = `update customers set customer_status='active' where customer_id='${cst_id}' returning *`;
    status = "failed";
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rowCount > 0) {
        status = "success";
      }
      res.status(200).send(status);
    });
  } else if (action == "deactivate") {
    sql = `update customers set customer_status='inactive' where customer_id='${cst_id}' returning *`;
    status = "failed";
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rowCount > 0) {
        status = "success";
      }
      res.status(200).json({ status: status });
    });
  } else if (action == "access_panel") {
    sql = `select * from customers  where customer_id='${cst_id}'`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rowCount > 0) {
        req.session.cst_id = cst_id;
        status = "success";
      }
      res.status(200).send(status);
    });
  } else if (action == "delete") {
    sql = `select * from customers where customer_id='${cst_id}'`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rowCount > 0) {
        customer_num = results.rows[0]["customer_num"];
        sql = `delete from customers where customer_id='${cst_id}' returning *`;
        pool.query(sql, (err, results) => {
          if (err) {
            throw err;
          }
          sql = `delete from cards where cst_unique_id='${customer_num}'`;
          pool.query(sql, (err, results) => {
            if (err) {
              throw err;
            }
            status = "success";
            res.status(200).json({ status: status });
          });
        });
      } else {
        results.status(500).json({ message: "Customer not found" });
      }
    });
  }
};
