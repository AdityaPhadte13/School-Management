module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn || req.session.userType !== "staff") {
    return res.redirect("/staff/login");
  }
  next();
};
