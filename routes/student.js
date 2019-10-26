const express = require("express");

const studentController = require("../controllers/student");

const router = express.Router();

router.get("/login", studentController.getStudentLogin);
router.post("/login", studentController.postStudentLogin);
router.post("/logout", studentController.postStudentLogout);

module.exports = router;
