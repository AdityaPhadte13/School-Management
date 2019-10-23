const rootPath = require("../util/path");
const path = require("path");
const express = require("express");
const schoolController = require("../controllers/school");

const router = express.Router();

router.get(["/", "/home"], schoolController.getHome);

router.get("/about", schoolController.getAbout);

router.get("/contact", schoolController.getContact);

module.exports = router;
