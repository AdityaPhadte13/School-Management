const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/login", adminController.getAdminLogin);
router.post("/login", adminController.postAdminLogin);

router.get(["/", "/home"], adminController.getAdminHome);

module.exports = router;
