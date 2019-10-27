const Staff = require("../models/staff");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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
    errorMessage: "",
    validationErrors: [],
    data: {
      oldPassword: "",
      newPassword: "",
      ConfirmPassword: ""
    }
  });
};

exports.postStaffNewPass = (req, res) => {
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  const conPass = req.body.ConfirmPassword;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array(), errors.array()[0]);
    return res.status(422).render("newPass", {
      pageTitle: "Change Password",
      path: "/staff/newPass",
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
      return Staff.UpdatePassword(req.session.User, PassHash).then(dummy =>
        res.redirect("/staff/home")
      );
    })
    .catch(err => console.log(err));
};

exports.getStaffData = (req, res) => {
  Staff.FetchAll()
    .then(([staff]) => {
      res.render("./staff/staff", {
        pageTitle: "Staff Data",
        path: "/staff/staffData",
        staff: staff,
        input: "",
        errorMessage: "",
        validationErrors: []
      });
    })
    .catch(err => console.log(err));
};

exports.postStaffData = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Staff.FetchAll()
      .then(([staff]) => {
        return res.status(422).render("./staff/staff", {
          pageTitle: "Staff Data",
          path: "/staff/staffData",
          staff: staff,
          input: req.body.SearchText,
          errorMessage: errors.array()[0],
          validationErrors: errors.array()
        });
      })
      .catch(err => console.log(err));
  }

  Staff.SearchByID(req.body.SearchText)
    .then(([staff]) => {
      return res.render("./staff/staff", {
        pageTitle: "Staff Data",
        path: "/staff/staffData",
        staff: staff,
        input: req.body.SearchText,
        errorMessage: "",
        validationErrors: []
      });
    })
    .catch(err => console.log(err));
};
