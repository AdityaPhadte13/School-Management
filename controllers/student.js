exports.getStudentLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Student Login",
    path: "/student/login",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
    AdminPriviledges: req.session.AdminPriviledges
  });
};

exports.postStudentLogin = (req, res) => {
  req.session.isLoggedIn = true;
  req.session.userType = "student";
  req.session.AdminPriviledges = false;
  console.log(req.body);
  res.redirect("/student/home");
};

exports.postStudentLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};
