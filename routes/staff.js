const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const Staff = require("../models/staff");

const staffController = require("../controllers/staff");
const schoolController = require("../controllers/school");
const studentDataController = require("../controllers/studentData");
const staffDataController = require("../controllers/staffData");
const teacherDataController = require("../controllers/teacherData");
const isAuth = require("../middleware/isAuthStaff");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get(["/", "/home"], isAuth, schoolController.getHome);

//staff routers
router.get("/staffData", isAuth, isAdmin, staffDataController.getStaffData);
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
  staffDataController.postStaffData
);
router.get(
  "/staffData/add",
  isAuth,
  isAdmin,
  staffDataController.getStaffDataAdd
);
router.post(
  "/staffData/add",
  [
    body("Fname", "Name Should Conatain only Letters")
      .trim()
      .isAlpha(),
    body("Mname", "Name Should Conatain only Letters")
      .trim()
      .optional({ checkFalsy: true })
      .isAlpha(),
    body("Lname", "Name Should Conatain only Letters")
      .trim()
      .isAlpha(),
    body("Qualification", "Qualification Should Conatain only Letters")
      .trim()
      .isAlpha()
      .customSanitizer(value => {
        return value.toUpperCase();
      }),
    body("Post", "Post Should Conatain only Letters")
      .trim()
      .isAlpha()
      .customSanitizer(value => {
        return value.toUpperCase();
      }),
    body("Salary", "Salary Should Contain only Numbers")
      .trim()
      .isDecimal(),
    body("PhoneNo1", "Invalid Phone Number")
      .trim()
      .isDecimal(),
    body("PhoneNo2", "Invalid Phone Number")
      .trim()
      .optional({ checkFalsy: true })
      .isDecimal(),
    body("Email", "Email is Not Valid")
      .trim()
      .normalizeEmail()
      .optional({ checkFalsy: true })
      .isEmail()
      .custom(value => {
        return Staff.FetchByLogin(value).then(([row]) => {
          if (row.length > 0) {
            return Promise.reject("Email is Already in Use");
          }
        });
      }),
    body("Address")
      .escape()
      .isString()
      .isLength({ min: 6 })
      .withMessage("Address is Too Short")
  ],
  isAuth,
  isAdmin,
  staffDataController.postStaffDataAdd
);

router.get(
  "/staffdata/edit/:id",
  isAuth,
  isAdmin,
  staffDataController.getStaffDataEdit
);

router.post(
  "/staffData/edit/:id",
  [
    body("Fname", "Name Should Conatain only Letters")
      .trim()
      .isAlpha(),
    body("Mname", "Name Should Conatain only Letters")
      .trim()
      .optional({ checkFalsy: true })
      .isAlpha(),
    body("Lname", "Name Should Conatain only Letters")
      .trim()
      .isAlpha(),
    body("Qualification", "Qualification Should Conatain only Letters")
      .trim()
      .isAlpha()
      .customSanitizer(value => {
        return value.toUpperCase();
      }),
    body("Post", "Post Should Conatain only Letters")
      .trim()
      .isAlpha()
      .customSanitizer(value => {
        return value.toUpperCase();
      }),
    body("Salary", "Salary Should Contain only Numbers")
      .trim()
      .isDecimal(),
    body("PhoneNo1", "Invalid Phone Number")
      .trim()
      .isDecimal(),
    body("PhoneNo2", "Invalid Phone Number")
      .trim()
      .optional({ checkFalsy: true })
      .isDecimal(),
    body("Email", "Email is Not Valid")
      .trim()
      .normalizeEmail()
      .optional({ checkFalsy: true })
      .isEmail()
      .custom((value, { req }) => {
        return Staff.FetchByLogin(value).then(([row]) => {
          if (row.length > 0 && req.params.id != row[0].StaffID) {
            return Promise.reject("Email is Already in Use");
          }
        });
      }),
    body("Address")
      .escape()
      .isString()
      .isLength({ min: 6 })
      .withMessage("Address is Too Short")
  ],
  isAuth,
  isAdmin,
  staffDataController.postStaffDataEdit
);

router.post(
  "/staffData/resetPass",
  isAuth,
  isAdmin,
  staffDataController.postStaffDataPass
);

router.post(
  "/staffData/delete",
  isAuth,
  isAdmin,
  staffDataController.postStaffDataDel
);

router.get(
  "/staffdata/view/:id",
  isAuth,
  isAdmin,
  staffDataController.getStaffDataView
);

//teacher routers
router.get(
  "/teacherData",
  isAuth,
  isAdmin,
  teacherDataController.getTeacherData
);
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
  teacherDataController.postTeacherData
);
router.get(
  "/teacherdata/view/:id",
  isAuth,
  isAdmin,
  teacherDataController.getTeacherDataView
);
router.get(
  "/teacherData/add",
  isAuth,
  isAdmin,
  teacherDataController.getTeacherDataAdd
);

//student routers
router.get(
  "/studentData",
  isAuth,
  isAdmin,
  studentDataController.getStudentData
);
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
  studentDataController.postStudentData
);

router.get(
  "/studentdata/view/:id",
  isAuth,
  isAdmin,
  studentDataController.getStudentDataView
);
router.get(
  "/studentData/add",
  isAuth,
  isAdmin,
  studentDataController.getStudentDataAdd
);

//school routers
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
