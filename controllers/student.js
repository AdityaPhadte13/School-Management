exports.getStudentLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Student Login",
    path: "/student/login"
  });
};

exports.postStudentLogin = (req, res) => {
  console.log(req.body);
  res.redirect("/student/home");
};

exports.getStudentHome = (req, res) => {
  res.render("student/home", {
    pageTitle: "Student",
    path: "/student/home"
  });
};
