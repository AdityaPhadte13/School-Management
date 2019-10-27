const express = require("express");

const teacherController = require("../controllers/teacher");
const schoolController = require("../controllers/school");
const isAuth = require("../middleware/isAuthTeacher");

const router = express.Router();

router.get(["/", "/home"], isAuth, schoolController.getHome);
router.get("/about", isAuth, schoolController.getAbout);
router.get("/contact", isAuth, schoolController.getContact);

router.get("/login", teacherController.getTeacherLogin);
router.post("/login", teacherController.postTeacherLogin);

router.get("/newPass", isAuth, teacherController.getTeacherNewPass);
router.post("/newPass", isAuth, teacherController.postTeacherNewPass);

router.post("/logout", isAuth, teacherController.postTeacherLogout);

module.exports = router;
