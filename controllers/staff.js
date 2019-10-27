const Staff = require("../models/staff");
const bcrypt = require("bcryptjs");

exports.getStaffLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Staff Login",
    path: "/staff/login",
    errorMessage: req.flash("error")
  });
};

exports.postStaffLogin = (req, res) => {
  const Username = req.body.Username;
  const Password = req.body.Password;
  Staff.FetchByLogin(Username)
    .then(([staff]) => {
      if (staff.length === 0) {
        req.flash("error", "Invalid Username or Password");
        return req.session.save(err => {
          res.redirect("/staff/login");
        });
      }
      bcrypt
        .compare(Password, staff[0].Password)
        .then(doMatch => {
          if (doMatch) {
            req.session.User = staff[0].StaffID;
            req.session.isLoggedIn = true;
            req.session.userType = "staff";
            req.session.AdminPrivileges = Boolean(
              Number(staff[0].AdminPrivileges)
            );
            console.log(req.session.AdminPrivileges);
            return req.session.save(err => {
              res.redirect("/staff/home");
            });
          }
          req.flash("error", "Invalid Username or Password");
          return req.session.save(err => {
            res.redirect("/staff/login");
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postStaffLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};

exports.getStaffNewPass = (req, res) => {
  res.render("newPass", {
    pageTitle: "Change Password",
    path: "/staff/newPass",
    errorMessage: req.flash("error")
  });
};

exports.postStaffNewPass = (req, res) => {
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  const conPass = req.body.ConfirmPassword;
  if (newPass !== conPass) {
    req.flash("error", "Entered Passwords Do Not Match");
    return req.session.save(err => {
      res.redirect("/staff/newPass");
    });
  }
  Staff.FetchLoginByID(req.session.User)
    .then(([staff]) => {
      if (staff.length === 0) {
        req.flash("error", "Invalid Username or Password");
        return req.session.save(err => {
          res.redirect("/staff/login");
        });
      }
      bcrypt
        .compare(oldPass, staff[0].Password)
        .then(doMatch => {
          if (doMatch) {
            return bcrypt.compare(newPass, staff[0].Password).then(match => {
              if (match) {
                req.flash("error", "New Password Cannot Be Old Password");
                return req.session.save(err => {
                  return res.redirect("/staff/newPass");
                });
              }
              return bcrypt.hash(newPass, 10).then(PassHash => {
                return Staff.UpdatePassword(req.session.User, PassHash).then(
                  dummy => res.redirect("/staff/home")
                );
              });
            });
          }
          req.flash("error", "Incorrect Password Entered");
          return req.session.save(err => {
            return res.redirect("/staff/newPass");
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
