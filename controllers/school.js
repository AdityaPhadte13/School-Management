const notice = require("../models/notice");
exports.getHome = (req, res) => {
  pageTitle = req.url.includes("student")
    ? "Student HomePage"
    : req.url.includes("teacher")
    ? "Teacher HomePage"
    : req.url.includes("staff")
    ? "Staff HomePage"
    : "HomePage";
  notice
    .FetchAll()
    .then(([row]) => {
      res.render("index", {
        pageTitle: pageTitle,
        path: req.url,
        notices: row,
        isLoggedIn: req.session.isLoggedIn,
        userType: req.session.userType,
        AdminPriviledges: req.session.AdminPriviledges
      });
    })
    .catch(err => console.log(err));
};

exports.getAbout = (req, res) => {
  res.render("about", {
    pageTitle: "About",
    path: req.url,
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
    AdminPriviledges: req.session.AdminPriviledges
  });
};

exports.getContact = (req, res) => {
  res.render("contact", {
    pageTitle: "Contact Us",
    path: req.url,
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
    AdminPriviledges: req.session.AdminPriviledges
  });
};
