exports.getStudentLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Student Login",
    path: "/student/login",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType
  });
};

exports.postStudentLogin = (req, res) => {
  req.session.isLoggedIn = true;
  req.session.userType = "student";
  console.log(req.body);
  res.redirect("/student/home");
};

exports.getStudentHome = (req, res) => {
  res.render("student/home", {
    pageTitle: "Student",
    path: "/student/home",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType
  });
};

exports.postStudentLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};
