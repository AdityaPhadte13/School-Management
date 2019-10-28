const bcrypt = require("bcryptjs");
const Student = require("../models/student");
const { validationResult } = require("express-validator");

exports.getStudentLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Student Login",
    path: "/student/login",
    errorMessage: req.flash("error")
  });
};

exports.postStudentLogin = (req, res) => {
  const Username = req.body.Username;
  const Password = req.body.Password;
  Student.FetchByLogin(Username)
    .then(([student]) => {
      if (student.length === 0) {
        req.flash("error", "Invalid Username or Password");
        return req.session.save(err => {
          res.redirect("/student/login");
        });
      }
      bcrypt
        .compare(Password, student[0].Password)
        .then(doMatch => {
          if (doMatch) {
            req.session.User = student[0].StudentID;
            req.session.isLoggedIn = true;
            req.session.userType = "student";
            req.session.AdminPrivileges = false;
            // console.log(req.body);
            return req.session.save(err => {
              res.redirect("/student/home");
            });
          }
          req.flash("error", "Invalid Username or Password");
          return req.session.save(err => {
            res.redirect("/student/login");
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postStudentLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};

exports.getStudentNewPass = (req, res) => {
  res.render("newPass", {
    pageTitle: "Change Password",
    path: "/student/newPass",
    errorMessage: "",
    validationErrors: [],
    data: {
      oldPassword: "",
      newPassword: "",
      ConfirmPassword: ""
    }
  });
};

exports.postStudentNewPass = (req, res) => {
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  const conPass = req.body.ConfirmPassword;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array(), errors.array()[0]);
    return res.status(422).render("newPass", {
      pageTitle: "Change Password",
      path: "/student/newPass",
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
      return Student.UpdatePassword(req.session.User, PassHash).then(dummy =>
        res.redirect("/student/home")
      );
    })
    .catch(err => console.log(err));
};
