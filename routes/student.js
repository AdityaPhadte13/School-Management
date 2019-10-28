const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const Student = require("../models/student");

const studentController = require("../controllers/student");
const schoolController = require("../controllers/school");
const isAuth = require("../middleware/isAuthStudent");

const router = express.Router();

router.get(["/", "/home"], isAuth, schoolController.getHome);
router.get("/about", isAuth, schoolController.getAbout);
router.get("/contact", isAuth, schoolController.getContact);

router.get("/login", studentController.getStudentLogin);
router.post("/login", studentController.postStudentLogin);

router.get("/newPass", isAuth, studentController.getStudentNewPass);
router.post(
  "/newPass",
  [
    body("oldPassword")
      .trim()
      .custom((value, { req }) => {
        return Student.FetchLoginByID(req.session.User).then(([stud]) => {
          if (stud.length === 0) {
            return Promise.reject("Something Went Wrong");
          }
          return bcrypt.compare(value, stud[0].Password).then(doMatch => {
            if (!doMatch) {
              return Promise.reject("Incorrect Password Entered");
            }
          });
        });
      }),
    body("newPassword", "New Password Must be of Minimum 6 Characters Long")
      .trim()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        return Student.FetchLoginByID(req.session.User).then(([stud]) => {
          if (stud.length === 0) {
            return Promise.reject("Something Went Wrong");
          }
          return bcrypt.compare(value, stud[0].Password).then(doMatch => {
            if (doMatch) {
              return Promise.reject(
                "Old Password Should Not Match New Password"
              );
            }
          });
        });
      }),
    body("ConfirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (req.body.newPassword !== value) {
          throw new Error("Confirm Password Should Match with New Password");
        }
        return true;
      })
  ],
  isAuth,
  studentController.postStudentNewPass
);

router.post("/logout", isAuth, studentController.postStudentLogout);

module.exports = router;
