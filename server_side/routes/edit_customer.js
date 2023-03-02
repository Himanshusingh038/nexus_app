const pool = require("../dbconn");

module.exports = async (req, res) => {
  try {
    console.log("edit_customer");
    const { name, designation, email, mobile, cst_id } = req.body;
    sql = `update customers set customer_name='${name}',customer_designation='${designation}',customer_mobile='${mobile}',customer_email='${email}' where customer_num='${cst_id}'`;
    pool.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows > 0) {
        console.log(result);
        res.status(200).json({ status: "Profile updated successfully" });
      } else {
        res.status(200).json({ status: "Profile Update Failed" });
      }
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
