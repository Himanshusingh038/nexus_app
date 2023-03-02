const pool = require("../dbconn");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ status: "failed" });
    } else {
      const sql = `SELECT password FROM admin WHERE email='${email}'`;
      pool.query(sql, async (err, results) => {
        if (err) {
          throw err;
        }
        if (results.length === 0) {
          req.session.error = "Invalid Credentials";
          res.status(200).json({ status: "email not found" });
        } else {
          const user_password = results[0].password;
          const isMatch = await bcrypt.compare(password, user_password);
          if (!isMatch) {
            req.session.error = "Invalid Credentials";
            res.status(200).json({ status: "wrong password" });
          } else {
            req.session.isAuth = true;
            req.session.username = email;
            res.cookie("loggedIn", "true", {
              maxAge: 8640000 * 12,
              path: "/",
            });
            res.send({ status: "success" });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};
