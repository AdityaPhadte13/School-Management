const express = require("express");

const staffController = require("../controllers/staff");

const router = express.Router();

router.get("/login", staffController.getstaffLogin);
router.post("/login", staffController.poststaffLogin);

router.get(["/", "/home"], staffController.getstaffHome);

module.exports = router;
