const md5 = require("md5");
const pool = require("../dbconn");

const activateCards = (req, res) => {
  console.log("activate cards ");
  const {
    fname,
    lname,
    cst_email,
    password,
    card_id,
    old_email,
    cst_exists,
    cst_unique_id,
  } = req.body;
  if (fname === null || fname === "" || lname === null || lname === "") {
    name = "";
  } else {
    name = fname + " " + lname;
  }
  new_pass = md5(password);
  console.log(cst_unique_id);
  if (cst_exists == "yes") {
    console.log("cst_exists");
    if (cst_email !== old_email) {
      console.log("cst_email!=old_email");
      sql = `select * from customers where customer_email='${cst_email}'`;
      pool.query(sql, (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rowCount > 0) {
          res.status(200).send("customer already exists");
        } else {
          console.log("update customers accounts");
          sql = `update customers set customer_name='${name}',customer_email='${cst_email}',customer_password='${new_pass}' where customer_num='${cst_unique_id}'`;
          pool.query(sql, (err, results) => {
            if (err) {
              throw err;
            }
            if (results.rowCount > 0) {
              sql = `update cards set fname='${fname}',lname='${lname}',card_status='active',email='${cst_email}' where card_id='${card_id}'`;
              pool.query(sql, (err, results) => {
                if (err) {
                  throw err;
                }
                if (results.rowCount > 0) {
                  res
                    .status(200)
                    .json({ message: "Account Activated successfully" });
                }
              });
            }
          });
        }
      });
    } else {
      console.log("cst_email=old_email");
      sql = `update customers set customer_name='${name}',customer_email='${cst_email}',customer_password='${new_pass}' where customer_num='${cst_unique_id}'`;
      pool.query(sql, (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rowCount > 0) {
          sql = `update cards set fname='${fname}',lname='${lname}',card_status='active',email='${cst_email}' where card_id='${card_id}' returning *`;
          pool.query(sql, (err, results) => {
            if (err) {
              throw err;
            }
            if (results.rowCount > 0) {
              console.log(results.rows);
              res
                .status(200)
                .json({ message: "Account Activated successfully" });
            }
          });
        }
      });
    }
  } else if (cst_exists == "no") {
    var cst_unq_id = Math.floor(Math.random() * (99999999 - 11111111));
    sql = `select * from customers where customer_email='${cst_email}'`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rowCount > 0) {
        res.status(200).send("Email Already Exists");
      } else {
        sql = `insert into customers (customer_name,customer_email,customer_password,customer_num) values('${name}','${cst_email}','${new_pass}','${cst_unq_id}')`;
        pool.query(sql, (err, results) => {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("step 2");
          if (results.rowCount > 0) {
            sql = `update cards set fname='${fname}',lname='${lname}',email='${cst_email}',card_status='active',cst_unique_id='${cst_unq_id}' where card_id='${card_id}'`;
            pool.query(sql, (err, results) => {
              if (err) {
                throw err;
              }
              console.log("step 3");
              if (results.rowCount > 0) {
                res
                  .status(200)
                  .json({ message: "Account Activated successfully" });
              }
            });
          }
        });
      }
    });
  }
};

module.exports = activateCards;
