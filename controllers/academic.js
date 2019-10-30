const Teacher = require("../models/teacher");
const schoolClass=require("../models/schoolClass");

exports.getTeacherView = (req, res) => {
//   console.log(Number(req.session.User)),
    Teacher.FetchClass(req.session.User)
      .then(([row]) => {
        if(row.length === 0){
            res.status(404).render("error", {
              pageTitle: "Page Not Found",
              path: "",
              errCode: "404",
              errDescription: "Page Not Found"
            });
          } 
        return res.render("academic/class", {
          pageTitle: "Teacher's classes",
          path: "/academic/class",
          per: row,
        });
      })
      .catch(err => console.log(err));
};

exports.getClassView=(req, res) => { 
  console.log(req.params.id),
  schoolClass.FetchAllStudents(req.params.id)
.then(([row]) => {
  if(row.length === 0){
    res.status(404).render("error", {
      pageTitle: "Page Not Found",
      path: "",
      errCode: "404",
      errDescription: "Page Not Found"
    });
  } 
  return res.render("academic/card", {
    pageTitle: "class card",
    path: "/academic/classcard",
    per: row
  });    
})
.catch(err => console.log(err));
 };


exports.getupdate=(req, res) => { 
    res.render("academic/form", {
    pageTitle: "update form",
    path: "/academic/form",
  });    
 };