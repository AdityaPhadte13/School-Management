const bcrypt = require("bcryptjs");
const Student = require("../models/student");

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
    errorMessage: req.flash("error")
  });
};

exports.postStudentNewPass = (req, res) => {
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  const conPass = req.body.ConfirmPassword;
  if (newPass !== conPass) {
    req.flash("error", "Entered Passwords Do Not Match");
    return req.session.save(err => {
      res.redirect("/student/newPass");
    });
  }
  Student.FetchLoginByID(req.session.User)
    .then(([student]) => {
      if (student.length === 0) {
        req.flash("error", "Invalid Username or Password");
        return req.session.save(err => {
          res.redirect("/student/login");
        });
      }
      bcrypt
        .compare(oldPass, student[0].Password)
        .then(doMatch => {
          if (doMatch) {
            return bcrypt.compare(newPass, student[0].Password).then(match => {
              if (match) {
                req.flash("error", "New Password Cannot Be Old Password");
                return req.session.save(err => {
                  return res.redirect("/student/newPass");
                });
              }
              return bcrypt.hash(newPass, 10).then(PassHash => {
                return Student.UpdatePassword(req.session.User, PassHash).then(
                  dummy => res.redirect("/student/home")
                );
              });
            });
          }
          req.flash("error", "Incorrect Password Entered");
          return req.session.save(err => {
            return res.redirect("/student/newPass");
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
