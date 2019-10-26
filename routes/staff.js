const express = require("express");

const staffController = require("../controllers/staff");
const schoolController = require("../controllers/school");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get(["/", "/home"], isAuth, schoolController.getHome);
router.get("/about", isAuth, schoolController.getAbout);
router.get("/contact", isAuth, schoolController.getContact);

router.get("/login", staffController.getStaffLogin);
router.post("/login", staffController.postStaffLogin);
router.post("/logout", isAuth, staffController.postStaffLogout);

module.exports = router;
