const express = require("express");

const studentController = require("../controllers/student");

const router = express.Router();

router.get("/login", studentController.getStudentLogin);

router.get("/", studentController.getStudentHome);

module.exports = router;
