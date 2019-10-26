const Staff = require("../models/staff");
const bcrypt = require("bcryptjs");

exports.getStaffLogin = (req, res) => {
  res.render("login", {
    pageTitle: "staff Login",
    path: "/staff/login",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
    AdminPrivileges: req.session.AdminPrivileges
  });
};

exports.postStaffLogin = (req, res) => {
  const Username = req.body.Username;
  const Password = req.body.Password;
  Staff.FetchByLogin(Username)
    .then(([staff]) => {
      if (staff.length === 0) {
        return res.redirect("/staff/login");
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
