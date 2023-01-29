module.exports = (req, res) => {
  req.session.destroy((err) => {
    res.setHeader("set-cookie", "loggedIn=true; max-age=0");
    if (err) throw err;
    res.json({ message: "logout successful" });
  });
};
