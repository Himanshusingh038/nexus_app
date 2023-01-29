const pool = require("../dbconn");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == null || password == null) {
      res.status(400).json({ status: "failed" });
    } else {
      sql = `select password from admin where email='${email}'`;
      var data = await pool.query(sql);
      if (!data.rows[0]) {
        req.session.error = "Invalid Credentials";
        res.status(200).json({ status: "email not found" });
      } else {
        console.log("hello");
        const user_password = data.rows[0]["password"];
        console.log(user_password);
        const isMatch = await bcrypt.compare(password, user_password);
        if (!isMatch) {
          req.session.error = "Invalid Credentials";
          console.log("wrong place");
          res.status(200).json({ status: "wrong password" });
        } else {
          req.session.isAuth = true;
          req.session.username = email;
          res.cookie("cookieName", "12345678", {
            maxAge: 900000,
            httpOnly: true,
          });
          res.cookie("loggedIn", "true", {
            maxAge: 8640000 * 12,
            path: "/",
          });
          res.cookie("auth", "123456", {
            path: "/", // Make the cookie available to all routes
            maxAge: 60 * 60 * 1000, // Set the cookie to expire in one hour
          });

          res.send({ status: "success" });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};
