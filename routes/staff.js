const express = require("express");

const staffController = require("../controllers/staff");

const router = express.Router();

router.get("/login", staffController.getStaffLogin);
router.post("/login", staffController.postStaffLogin);
router.post("/logout", staffController.postStaffLogout);

router.get(["/", "/home"], staffController.getStaffHome);

module.exports = router;
