exports.getTeacherLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Teacher Login",
    path: "/teacher/login",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
    AdminPriviledges: req.session.AdminPriviledges
  });
};

exports.postTeacherLogin = (req, res) => {
  req.session.isLoggedIn = true;
  req.session.userType = "teacher";
  req.session.AdminPriviledges = false;
  console.log(req.body);
  res.redirect("/teacher/home");
};

exports.postTeacherLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};
