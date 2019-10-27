const express = require("express");

const staffController = require("../controllers/staff");
const schoolController = require("../controllers/school");
const isAuth = require("../middleware/isAuthStaff");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get(["/", "/home"], isAuth, schoolController.getHome);
router.get("/about", isAuth, schoolController.getAbout);
router.get("/contact", isAuth, schoolController.getContact);

router.get("/login", staffController.getStaffLogin);
router.post("/login", staffController.postStaffLogin);

router.get("/newPass", isAuth, staffController.getStaffNewPass);
router.post("/newPass", isAuth, staffController.postStaffNewPass);

router.post("/logout", isAuth, staffController.postStaffLogout);

module.exports = router;
