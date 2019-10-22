const express = require("express");

const teacherController = require("../controllers/teacher");

const router = express.Router();

router.get("/login", teacherController.getTeacherLogin);

router.get("/", teacherController.getTeacherHome);

module.exports = router;
