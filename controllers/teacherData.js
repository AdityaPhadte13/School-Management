const Staff = require("../models/staff");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const SClass = require("../models/schoolClass");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// TeacherData Controllers Start
exports.getTeacherData = (req, res) => {
  Teacher.FetchAll()
    .then(([teacher]) => {
      res.render("./teacher/teacher", {
        pageTitle: "teacher Data",
        path: "/staff/teacherData",
        teacher: teacher,
        input: "",
        errorMessage: "",
        validationErrors: []
      });
    })
    .catch(err => console.log(err));
};

exports.postTeacherData = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Teacher.FetchAll()
      .then(([teacher]) => {
        return res.status(422).render("./teacher/teacher", {
          pageTitle: "teacher Data",
          path: "/staff/teacherData",
          teacher: teacher,
          input: req.body.SearchText,
          errorMessage: errors.array()[0],
          validationErrors: errors.array()
        });
      })
      .catch(err => console.log(err));
  }

  Teacher.SearchByID(req.body.SearchText)
    .then(([teacher]) => {
      return res.render("./teacher/teacher", {
        pageTitle: "teacher Data",
        path: "/staff/teacherData",
        teacher: teacher,
        input: req.body.SearchText,
        errorMessage: "",
        validationErrors: []
      });
    })
    .catch(err => console.log(err));
};

exports.getTeacherDataView = (req, res) => {
  Teacher.FetchByID(req.params.id)
    .then(([teacher]) => {
      if (teacher.length === 0) {
        returnres.status(404).render("error", {
          pageTitle: "Page Not Found",
          path: "",
          errCode: "404",
          errDescription: "Page Not Found"
        });
      }
      return Staff.FetchPhone(req.params.id, teacher[0].PhoneNo).then(
        ([phone]) => {
          if (phone.length === 0) {
            phone.push({ PhoneNo: "" });
          }
          return res.render("./teacher/card", {
            pageTitle: "Details",
            path: "/teacherData/view",
            staff: teacher[0],
            phone: phone[0].PhoneNo
          });
        }
      );
    })
    .catch(err => console.log(err));
};
exports.getTeacherDataAdd = (req, res) => {
  res.render("./teacher/form", {
    pageTitle: "Add Teacher",
    path: "/staff/teacherData/add"
  });
};

// TeacherData Controllers End
