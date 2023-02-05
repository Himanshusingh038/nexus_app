const pool = require("../dbconn");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { email, current_password, new_password, confirm_password } = req.body;
  const sql = `select password from admin where email='${email}'`;
  var status = "failed";
  try {
    var data = await pool.query(sql);
    if (data.rows.length == 0) {
      res.status(500).json({ error: "incorrect mail address" });
    }
    const old_password = data.rows[0].password;
    const isMatch = await bcrypt.compare(current_password, old_password);
    if (isMatch && new_password == confirm_password) {
      new_pass = await bcrypt.hash(new_password, 10);
      const sql = `update admin set password='${new_pass}' where email='${email}'`;
      var data = await pool.query(sql);
      status = "password changed";
      res.status(200).json({status: status})
    }else if(!isMatch){
      res.status(200).json({error: "incorrect old password" });
    }else{
      res.status(200).json({error: "password didn't match"})
    }
  } catch (error) {
    console.log(error);
    status = "error: check in console";
    res.status(500).json({ error: error });
  } finally {
    console.log(status);
  }
};
