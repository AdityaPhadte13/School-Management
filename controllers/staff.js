exports.getStaffLogin = (req, res) => {
  res.render("login", {
    pageTitle: "staff Login",
    path: "/staff/login",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType
  });
};

exports.postStaffLogin = (req, res) => {
  req.session.isLoggedIn = true;
  req.session.userType = "staff";
  console.log(req.body);
  res.redirect("/staff/home");
};

exports.getStaffHome = (req, res) => {
  res.render("staff/home", {
    pageTitle: "staff",
    path: "/staff/home",
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType
  });
};

exports.postStaffLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/home");
  });
};
