exports.getTeacherLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Teacher Login",
    path: "/teacher/login",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType
  });
};

exports.postTeacherLogin = (req, res) => {
  req.session.isLoggedIn = true;
  req.session.userType = "teacher";
  console.log(req.body);
  res.redirect("/teacher/home");
};

exports.getTeacherHome = (req, res) => {
  res.render("teacher/home", {
    pageTitle: "Teacher",
    path: "/teacher/home",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType
  });
};

exports.postTeacherLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};
