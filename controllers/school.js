exports.getHome = (req, res) => {
  res.render("index", {
    pageTitle: "Home",
    path: "/home"
  });
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
