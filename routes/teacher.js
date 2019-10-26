const express = require("express");

const teacherController = require("../controllers/teacher");

const router = express.Router();

router.get("/login", teacherController.getTeacherLogin);
router.post("/login", teacherController.postTeacherLogin);
router.post("/logout", teacherController.postTeacherLogout);

module.exports = router;
