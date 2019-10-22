exports.getStudentLogin = (req, res) => {
  res.send("<h1>Student Login Page</h1>");
};

exports.getStudentHome = (req, res) => {
  res.render("student/home", {
    pageTitle: "Student",
    path: "/student/"
  });
};
