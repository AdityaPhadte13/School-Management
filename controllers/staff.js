const staff = require("../models/staff");

exports.getStaffLogin = (req, res) => {
  res.render("login", {
    pageTitle: "staff Login",
    path: "/staff/login",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
    AdminPriviledges: req.session.AdminPriviledges
  });
};

exports.postStaffLogin = (req, res) => {
  staff
    .FetchAllLogin()
    .then(([row]) => {
      // console.log(row);
      req.session.isLoggedIn = true;
      req.session.userType = "staff";
      req.session.AdminPriviledges = false;
      // console.log(req.body);
      res.redirect("/staff/home");
    })
    .catch(err => console.log(err));
};

exports.postStaffLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};
