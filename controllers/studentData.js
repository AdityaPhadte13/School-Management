// StudentData Controllers Start
const Staff = require("../models/staff");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const SClass = require("../models/schoolClass");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");


exports.getStudentData = (req, res) => {
    Student.FetchAll()
      .then(([student]) => {
        return SClass.FetchAll().then(([sclass]) => {
          return res.render("./student/student", {
            pageTitle: "student Data",
            path: "/staff/studentData",
            student: student,
            input: {
              text: "",
              option: ""
            },
            errorMessage: "",
            validationErrors: [],
            sclass: sclass
          });
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.postStudentData = (req, res) => {
    const errors = validationResult(req);
  
    console.log(req.body.Sclass);
  
    if (!errors.isEmpty()) {
      return Student.FetchAll()
        .then(([student]) => {
          return SClass.FetchAll().then(([sclass]) => {
            return res.status(422).render("./student/student", {
              pageTitle: "student Data",
              path: "/staff/studentData",
              student: student,
              input: {
                text: req.body.SearchText,
                option: req.body.Sclass
              },
              errorMessage: errors.array()[0],
              validationErrors: errors.array(),
              sclass: sclass
            });
          });
        })
        .catch(err => console.log(err));
    }
  
    Student.SearchByID(req.body.SearchText, req.body.Sclass)
      .then(([student]) => {
        return SClass.FetchAll().then(([sclass]) => {
          return res.render("./student/student", {
            pageTitle: "student Data",
            path: "/staff/studentData",
            student: student,
            input: {
              text: req.body.SearchText,
              option: req.body.Sclass
            },
            errorMessage: "",
            validationErrors: [],
            sclass: sclass
          });
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.getStudentDataView = (req, res) => {
    Student.FetchByID(req.params.id)
      .then(([student]) => {
        return res.render("./student/card", {
          pageTitle: "Details",
          path: "/staffData/view",
          per: student[0]
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.getStudentDataAdd = (req, res) => {
    res.render("./student/form", {
      pageTitle: "Add student",
      path: "/staff/studentData/add"
    });
  };
  // StudentData Controllers End