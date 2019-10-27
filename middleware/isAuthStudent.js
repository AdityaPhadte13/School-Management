module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn || req.session.userType !== "student") {
    return res.redirect("/student/login");
  }
  next();
};
