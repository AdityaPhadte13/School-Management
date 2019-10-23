exports.getAdminLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Admin Login",
    path: "/admin/login"
  });
};

exports.postAdminLogin = (req, res) => {
  console.log(req.body);
  res.redirect("/admin/home");
};

exports.getAdminHome = (req, res) => {
  res.render("admin/home", {
    pageTitle: "Admin",
    path: "/admin/"
  });
};
