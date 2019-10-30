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
    path: "/staff/staffData/add",
    staff: {},
    errorMessage: "",
    validationErrors: []
  });
};

exports.postStaffDataAdd = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).render("./staff/form", {
      pageTitle: "Staff Data Add",
      path: "/staff/staffData/add",
      staff: req.body,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }
  staffobj = new Staff(
    0,
    req.body.Fname,
    req.body.Mname,
    req.body.Lname,
    req.body.BirthDate,
    req.body.JoinDate,
    req.body.Gender,
    req.body.Qualification,
    req.body.Address,
    req.body.Salary,
    req.body.Post,
    req.body.Email,
    "",
    "",
    req.body.AdminPrivileges,
    [req.body.PhoneNo1, req.body.PhoneNo2]
  );
  staffobj
    .save()
    .then(() => {
      req.flash("user", "Data was Saved with Username: " + staffobj.Username);
      return req.session.save(err => {
        return res.redirect("/staff/staffData/view/" + staffobj.StaffID);
      });
    })
    .catch(err => console.log(err));
};

// Staff Data Add Controllers END

// Staff Data Edit Controllers Start
exports.getStaffDataEdit = (req, res) => {
  Staff.FetchByID(req.params.id)
    .then(([staffData]) => {
      if (staffData.length === 0) {
        res.status(404).render("error", {
          pageTitle: "Page Not Found",
          path: "",
          errCode: "404",
          errDescription: "Page Not Found"
        });
      }
      staffData[0].PhoneNo1 = staffData[0].PhoneNo;
      return Staff.FetchPhone(req.params.id, staffData[0].PhoneNo1).then(
        ([row]) => {
          if (row.length !== 0) {
            staffData[0].PhoneNo2 = row[0].PhoneNo;
          } else {
            staffData[0].PhoneNo2 = "";
          }
          return res.render("./staff/form", {
            pageTitle: "Staff Data Edit",
            path: "/staff/staffData/edit",
            staff: staffData[0],
            errorMessage: "",
            validationErrors: []
          });
        }
      );
    })
    .catch(err => console.log(err));
};

exports.postStaffDataEdit = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).render("./staff/form", {
      pageTitle: "Staff Data Edit",
      path: "/staff/staffData/edit",
      staff: req.body,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  staffobj = new Staff(
    req.params.id,
    req.body.Fname,
    req.body.Mname,
    req.body.Lname,
    req.body.BirthDate,
    req.body.JoinDate,
    req.body.Gender,
    req.body.Qualification,
    req.body.Address,
    req.body.Salary,
    req.body.Post,
    req.body.Email,
    "",
    "",
    req.body.AdminPrivileges,
    [req.body.PhoneNo1, req.body.PhoneNo2]
  );
  staffobj
    .update()
    .then(() => {
      req.flash("user", "Data was Saved");
      return req.session.save(err => {
        return res.redirect("/staff/staffData/view/" + staffobj.StaffID);
      });
    })
    .catch(err => console.log(err));
};

// Staff Data Edit Controllers End

exports.postStaffDataPass = (req, res) => {
  Staff.ResetPass(req.body.StaffID).then(() => {
    return res.redirect("/staff/staffData");
  }).catch(err => console.log(err));
};

exports.postStaffDataDel = (req, res) => {
  Staff.Delete(req.body.StaffID).then(() => {
    return res.redirect("/staff/staffData");
  }).catch(err => console.log(err));
};

exports.getStaffDataView = (req, res) => {
  Staff.FetchByID(req.params.id)
    .then(([staff]) => {
      if (staff.length === 0) {
        res.status(404).render("error", {
          pageTitle: "Page Not Found",
          path: "",
          errCode: "404",
          errDescription: "Page Not Found"
        });
      }
      return Staff.FetchPhone(staff[0].StaffID, staff[0].PhoneNo).then(
        ([phone2]) => {
          if (phone2.length === 0) {
            phone2.push({ PhoneNo: "" });
          }
          return res.render("./staff/card", {
            pageTitle: "Details",
            path: "/staffData/view",
            staff: staff[0],
            phone: phone2[0].PhoneNo,
            success: req.flash("user")
          });
        }
      );
    })
    .catch(err => console.log(err));
};
// StaffData Controllers End
