const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");

exports.getTeacherLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Teacher Login",
    path: "/teacher/login",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
    AdminPrivileges: req.session.AdminPrivileges
  });
};

exports.postTeacherLogin = (req, res) => {
  const Username = req.body.Username;
  const Password = req.body.Password;
  Teacher.FetchByLogin(Username)
    .then(([teacher]) => {
      if (teacher.length === 0) {
        return res.redirect("/teacher/login");
      }
      bcrypt
        .compare(Password, teacher[0].Password)
        .then(doMatch => {
          if (doMatch) {
            req.session.User = teacher[0].TeacherID;
            req.session.isLoggedIn = true;
            req.session.userType = "teacher";
            req.session.AdminPrivileges = false;
            // console.log(req.body);
            return req.session.save(err => {
              res.redirect("/teacher/home");
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postTeacherLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};
