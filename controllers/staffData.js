const Staff = require("../models/staff");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const SClass = require("../models/schoolClass");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// StaffData Controllers Start
exports.getStaffData = (req, res) => {
    Staff.FetchAll()
      .then(([staff]) => {
        res.render("./staff/staff", {
          pageTitle: "Staff Data",
          path: "/staff/staffData",
          staff: staff,
          input: "",
          errorMessage: "",
          validationErrors: []
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.postStaffData = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return Staff.FetchAll()
        .then(([staff]) => {
          return res.status(422).render("./staff/staff", {
            pageTitle: "Staff Data",
            path: "/staff/staffData",
            staff: staff,
            input: req.body.SearchText,
            errorMessage: errors.array()[0],
            validationErrors: errors.array()
          });
        })
        .catch(err => console.log(err));
    }
  
    Staff.SearchByID(req.body.SearchText)
      .then(([staff]) => {
        return res.render("./staff/staff", {
          pageTitle: "Staff Data",
          path: "/staff/staffData",
          staff: staff,
          input: req.body.SearchText,
          errorMessage: "",
          validationErrors: []
        });
      })
      .catch(err => console.log(err));
  };
  
  // Staff Data Add Controllers
  exports.getStaffDataAdd = (req, res) => {
    res.render("./staff/form", {
      pageTitle: "Staff Data Add",
      path: "/staff/staffData/add"
    });
  };
  
  exports.postStaffDataAdd = (req, res) => {
    console.log(req.body);
    res.redirect("/staff/staffData/add");
  };
  
  // Staff Data Add Controllers END
  
  exports.getStaffDataView = (req, res) => {
    res.render("./staff/card", {
      pageTitle: "Details",
      path: "/staffData/view"
    });
  }
  
  exports.getStaffDataView = (req, res) => {
    Staff.FetchByID(req.params.id)
      .then(([staff]) => {
        return res.render("./staff/card", {
          pageTitle: "Details",
          path: "/staffData/view",
          staff: staff[0]
        });
      })
      .catch(err => console.log(err));
  };
  // StaffData Controllers End