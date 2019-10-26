const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mySQLStore = require("express-mysql-session")(session);
const db = require("./util/database");
const csrf = require("csurf");
const flash = require("connect-flash");

const Staff = require("./models/staff");
const Student = require("./models/student");

const schoolRouter = require("./routes/school");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
const staffRouter = require("./routes/staff");

const errorController = require("./controllers/error");

const app = express();
const csrfProtection = csrf();
app.set("view engine", "ejs");
app.set("views", "views");

const sessionStore = new mySQLStore({ createDatabaseTable: true }, db);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "asdbjhejhabsk23eorfh8u",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (req.session.userType === "teacher" || req.session.userType === "staff") {
    Staff.FetchNameByID(req.session.User)
      .then(([staff]) => {
        res.locals.UName = staff[0].Fname;
        next();
      })
      .catch(err => console.log(err));
  } else if (req.session.userType === "student") {
    Student.FetchNameByID(req.session.User)
      .then(([student]) => {
        res.locals.UName = student[0].Fname;
        next();
      })
      .catch(err => console.log(err));
  } else {
    res.locals.UName = "";
    next();
  }
});

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.userType = req.session.userType;
  res.locals.AdminPrivileges = req.session.AdminPrivileges;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/staff", staffRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use(schoolRouter);

app.use(errorController.get404error);

app.listen(8080);
