const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const Teacher = require("../models/teacher");

const teacherController = require("../controllers/teacher");
const schoolController = require("../controllers/school");
const academicController= require("../controllers/academic")
const isAuth = require("../middleware/isAuthTeacher");

const router = express.Router();

router.get(["/", "/home"], isAuth, schoolController.getHome);
router.get("/about", isAuth, schoolController.getAbout);
router.get("/contact", isAuth, schoolController.getContact);

router.get("/login", teacherController.getTeacherLogin);
router.post("/login", teacherController.postTeacherLogin);

router.get("/newPass", isAuth, teacherController.getTeacherNewPass);
router.post(
  "/newPass",
  [
    body("oldPassword")
      .trim()
      .custom((value, { req }) => {
        return Teacher.FetchLoginByID(req.session.User).then(([teach]) => {
          if (teach.length === 0) {
            return Promise.reject("Something Went Wrong");
          }
          return bcrypt.compare(value, teach[0].Password).then(doMatch => {
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
        return Teacher.FetchLoginByID(req.session.User).then(([teach]) => {
          if (teach.length === 0) {
            return Promise.reject("Something Went Wrong");
          }
          return bcrypt.compare(value, teach[0].Password).then(doMatch => {
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
  teacherController.postTeacherNewPass
);

router.post("/logout", isAuth, teacherController.postTeacherLogout);

//teaceher's academic routers
router.get("/academic",academicController.getTeacherView)
router.get("/academic/classview/:id",academicController.getClassView)
router.get("/academic/update",academicController.getupdate)

module.exports = router;
