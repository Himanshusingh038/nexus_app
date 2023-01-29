const pool = require("../dbconn");

module.exports = async (req, res) => {
  try {
    console.log("edit_customer");
    const { name, designation, email, mobile, cst_id } = req.body;
    sql = `update customers set customer_name='${name}',customer_designation='${designation}',customer_mobile='${mobile}',customer_email='${email}' where customer_num='${cst_id}' returning *`;
    var data = await pool.query(sql);
    const row = data.rows;
    if (row.length > 0) {
      res.status(200).json({ status: "Profile updated successfully" });
    } else {
      res.status(200).json({ status: "Profile Update Failed" });
    }
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
