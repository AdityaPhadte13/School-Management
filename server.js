const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mySQLStore = require("express-mysql-session")(session);
const db = require("./util/database");
const bcrypt = require("bcryptjs");

const schoolRouter = require("./routes/school");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
const staffRouter = require("./routes/staff");

const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const sessionStore = new mySQLStore({ createDatabaseTable: true }, db);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "asdbjhejhabsk23eorfh8u",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/staff", staffRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use(schoolRouter);

app.use(errorController.get404error);

app.listen(8080);
