exports.get404error = (req, res, next) => {
  res.status(404).render("error", {
    pageTitle: "Page Not Found",
    path: "",
    errCode: "404",
    errDescription: "Page Not Found"
  });
};

exports.get403error = (req, res, next) => {
  res.status(403).render("error", {
    pageTitle: "Page Not Found",
    path: "",
    errCode: "403",
    errDescription: "Forbidden"
  });
};

exports.get401error = (req, res, next) => {
  res.status(401).render("error", {
    pageTitle: "Page Not Found",
    path: "",
    errCode: "401",
    errDescription: "Unauthorised Access"
  });
};

exports.get500error = (req, res, next) => {
  res.status(500).render("error", {
    pageTitle: "Page Not Found",
    path: "",
    errCode: "500",
    errDescription: "Internal Server Error"
  });
};
