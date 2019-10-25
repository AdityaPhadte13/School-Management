const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/database");
const student = require('./models/student')

const schoolRouter = require("./routes/school");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
const staffRouter = require("./routes/staff");

const errorController = require("./controllers/error");


//   student.FetchAllLogin().then(([row]) => {
//     console.log(row);
//   });

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(schoolRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/staff", staffRouter);

app.use(errorController.get404error);

app.listen(8080);
