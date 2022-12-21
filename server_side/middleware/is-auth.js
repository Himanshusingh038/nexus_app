module.exports = (req, res, next) => {
  console.log(req.headers);
  const loggedIn = req.headers.cookie.split(';').find(c => c.trim().startsWith('loggedIn=true'));
  if ( loggedIn) {
    next();
  } else {
    req.session.error = "You have to Login first";
    res.redirect("/login");
  }
};
// req.session.isAuth 

