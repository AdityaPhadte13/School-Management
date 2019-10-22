exports.getAdminLogin = (req, res) => {
  res.send("<h1>Admin Login Page</h1>");
};

exports.getAdminHome = (req, res) => {
  res.render("admin/home", {
    pageTitle: "Admin",
    path: "/admin/"
  });
};
