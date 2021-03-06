const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.getTeacherLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Teacher Login",
    path: "/teacher/login",
    errorMessage: req.flash("error")
  });
};

exports.postTeacherLogin = (req, res) => {
  const Username = req.body.Username;
  const Password = req.body.Password;
  Teacher.FetchByLogin(Username)
    .then(([teacher]) => {
      if (teacher.length === 0) {
        req.flash("error", "Invalid Username or Password");
        return req.session.save(err => {
          res.redirect("/teacher/login");
        });
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
          req.flash("error", "Invalid Username or Password");
          return req.session.save(err => {
            res.redirect("/teacher/login");
          });
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

exports.getTeacherNewPass = (req, res) => {
  res.render("newPass", {
    pageTitle: "Change Password",
    path: "/teacher/newPass",
    errorMessage: "",
    validationErrors: [],
    data: {
      oldPassword: "",
      newPassword: "",
      ConfirmPassword: ""
    }
  });
};

exports.postTeacherNewPass = (req, res) => {
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  const conPass = req.body.ConfirmPassword;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array(), errors.array()[0]);
    return res.status(422).render("newPass", {
      pageTitle: "Change Password",
      path: "/teacher/newPass",
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      data: {
        oldPassword: oldPass,
        newPassword: newPass,
        ConfirmPassword: conPass
      }
    });
  }
  bcrypt
    .hash(newPass, 10)
    .then(PassHash => {
      return Teacher.UpdatePassword(req.session.User, PassHash).then(dummy =>
        res.redirect("/teacher/home")
      );
    })
    .catch(err => console.log(err));
};
