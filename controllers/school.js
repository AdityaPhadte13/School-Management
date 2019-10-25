const student = require('../models/teacher')
exports.getHome = (req, res) => {
  student.FetchAllLogin()
    .then(([row]) => {
      res.render("index", {
        pageTitle: "Home",
        path: "/home",
        teachers: row
      });
    })
    .catch(err => console.log(err))
};

exports.getAbout = (req, res) => {
  res.render("about", {
    pageTitle: "About",
    path: req.url
  });
};

exports.getContact = (req, res) => {
  res.render("contact", {
    pageTitle: "Contact Us",
    path: req.url
  });
};
