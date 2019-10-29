const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const Staff = require("../models/staff");

const staffController = require("../controllers/staff");
const schoolController = require("../controllers/school");
const isAuth = require("../middleware/isAuthStaff");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get(["/", "/home"], isAuth, schoolController.getHome);

router.get("/staffData", isAuth, isAdmin, staffController.getStaffData);
router.post(
  "/staffData",
  [
    body("SearchText", "String Should Only Contain Numbers and Characters")
      .trim()
      .optional({ checkFalsy: true })
      .isAlphanumeric()
  ],
  isAuth,
  isAdmin,
  staffController.postStaffData
);
router.get("/staffData/add", staffController.getStaffDataAdd);
router.post("/staffData/add", staffController.postStaffDataAdd);

router.get("/staffdata/view/:id", staffController.getStaffDataView);

router.get("/teacherData", isAuth, isAdmin, staffController.getTeacherData);
router.post(
  "/teacherData",
  [
    body("SearchText", "String Should Only Contain Numbers and Characters")
      .trim()
      .optional({ checkFalsy: true })
      .isAlphanumeric()
  ],
  isAuth,
  isAdmin,
  staffController.postTeacherData
);

router.get("/studentData", isAuth, isAdmin, staffController.getStudentData);
router.post(
  "/studentData",
  [
    body("SearchText", "String Should Only Contain Numbers and Characters")
      .trim()
      .optional({ checkFalsy: true })
      .isAlphanumeric()
  ],
  isAuth,
  isAdmin,
  staffController.postStudentData
);

router.get("/about", isAuth, schoolController.getAbout);
router.get("/contact", isAuth, schoolController.getContact);

router.get("/login", staffController.getStaffLogin);
router.post("/login", staffController.postStaffLogin);

router.get("/newPass", isAuth, staffController.getStaffNewPass);
router.post(
  "/newPass",
  [
    body("oldPassword")
      .trim()
      .custom((value, { req }) => {
        return Staff.FetchLoginByID(req.session.User).then(([staff]) => {
          if (staff.length === 0) {
            return Promise.reject("Something Went Wrong");
          }
          return bcrypt.compare(value, staff[0].Password).then(doMatch => {
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
        return Staff.FetchLoginByID(req.session.User).then(([staff]) => {
          if (staff.length === 0) {
            return Promise.reject("Something Went Wrong");
          }
          return bcrypt.compare(value, staff[0].Password).then(doMatch => {
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
  staffController.postStaffNewPass
);

router.post("/logout", isAuth, staffController.postStaffLogout);

module.exports = router;
