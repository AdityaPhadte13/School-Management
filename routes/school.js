const rootPath = require("../util/path");
const path = require("path");
const express = require("express");
const schoolController = require("../controllers/school");

const router = express.Router();

router.get(
  [
    "/",
    "/teacher/",
    "/staff/",
    "/student/",
    "/home",
    "/teacher/home",
    "/staff/home",
    "/student/home"
  ],
  schoolController.getHome
);

router.get(
  ["/about", "/teacher/about", "/staff/about", "/student/about"],
  schoolController.getAbout
);

router.get(
  ["/contact", "/teacher/contact", "/staff/contact", "/student/contact"],
  schoolController.getContact
);

module.exports = router;
