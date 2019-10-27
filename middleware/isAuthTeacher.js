module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn || req.session.userType !== "teacher") {
    return res.redirect("/teacher/login");
  }
  next();
};
