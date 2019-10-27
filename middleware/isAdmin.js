module.exports = (req, res, next) => {
  if (!req.session.AdminPrivileges) {
    return res.status(401).render("error", {
      pageTitle: "Page Not Found",
      path: "",
      errCode: "401",
      errDescription: "Unauthorised Access",
      isLoggedIn: req.session.isLoggedIn,
      userType: req.session.userType,
      AdminPrivileges: req.session.AdminPrivileges
    });
  }
  next();
};
