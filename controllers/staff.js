exports.getstaffLogin = (req, res) => {
  res.render("login", {
    pageTitle: "staff Login",
    path: "/staff/login"
  });
};

exports.poststaffLogin = (req, res) => {
  console.log(req.body);
  res.redirect("/staff/home");
};

exports.getstaffHome = (req, res) => {
  res.render("staff/home", {
    pageTitle: "staff",
    path: "/staff/home"
  });
};
