exports.getTeacherLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Teacher Login",
    path: "/teacher/login"
  });
};

exports.postTeacherLogin = (req, res) => {
  console.log(req.body);
  res.redirect("/teacher/home");
};

exports.getTeacherHome = (req, res) => {
  res.render("teacher/home", {
    pageTitle: "Teacher",
    path: "/teacher/home"
  });
};
