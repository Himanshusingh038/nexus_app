const pool = require("../dbconn");

module.exports = (req, res) => {
  console.log("checkCustomerExists");
  const { card_id, action } = req.query;
  sql = `select * from cards where card_id='${card_id}' and card_status IN ('incomplete', 'unassigned')`;
  console.log(sql);
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    if (results.length > 0) {
      cst_unq_id = results[0]["cst_unique_id"];
      console.log(cst_unq_id);
      if (cst_unq_id != null) {
        sql = `select * from customers where customer_num='${cst_unq_id}'`;
        pool.query(sql, (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results);
          if (results.length == 0) {
            console.log("very bad");
            res.status(500).json({ message: "customer not found" });
          }
          console.log("bad -place");
          data = results;
          name = data[0]["customer_name"].trim().split(" ");
          fname = name[0];
          lname = name[1];
          email = data[0]["customer_email"];
          cst_exists = "yes";
          res
            .status(200)
            .json({
              fname: fname,
              lname: lname,
              email: email,
              cst_exists: cst_exists,
              cst_unq_id: cst_unq_id,
            });
        });
      } else {
        fname = "";
        lname = "";
        email = "";
        cst_exists = "no";
        res
          .status(200)
          .json({
            fname: fname,
            lname: lname,
            email: email,
            cst_exists: cst_exists,
            cst_unq_id: cst_unq_id,
          });
      }
    } else {
      res.status(500).json({ message: "card not found" });
    }
  });
};
