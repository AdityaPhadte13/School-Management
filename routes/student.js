const express = require("express");

const studentController = require("../controllers/student");
const schoolController = require("../controllers/school");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get(["/", "/home"], isAuth, schoolController.getHome);
router.get("/about", isAuth, schoolController.getAbout);
router.get("/contact", isAuth, schoolController.getContact);

router.get("/login", studentController.getStudentLogin);
router.post("/login", studentController.postStudentLogin);
router.post("/logout", isAuth, studentController.postStudentLogout);

module.exports = router;
