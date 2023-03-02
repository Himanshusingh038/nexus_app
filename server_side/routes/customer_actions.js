const pool = require("../dbconn");

module.exports = (req, res) => {
  const { action, cst_id } = req.query;
  try{

    if (action == "activate") {
      sql = `update customers set customer_status='active' where customer_id='${cst_id}' `;
      status = "failed";
      pool.query(sql, (err, results) => {
        if (err) {
          throw err;
        }
        if (results.affectedRows > 0) {
          status = "success";
        }
        res.status(200).send(status);
      });
    } else if (action == "deactivate") {
      sql = `update customers set customer_status='inactive' where customer_id='${cst_id}' `;
      status = "failed";
      pool.query(sql, (err, results) => {
        if (err) {
          throw err;
        }
        if (results.affectedRows > 0) {
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
        if (results.affectedRows > 0) {
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
        if (results.length > 0) {
          customer_num = results[0]["customer_num"];
          sql = `delete from customers where customer_id='${cst_id}'`;
          pool.query(sql, (err, results) => {
            if (err) {
              throw err;
            }
            status = "success";
            res.status(200).json({ status: status });
          });
        } else {
          res.status(500).json({ message: "Customer not found" });
        }
      });
    }
  }catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};
