const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/database");

const schoolRouter = require("./routes/school");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
const adminRouter = require("./routes/admin");

const errorController = require("./controllers/error");

db.execute("select * from books;")
  .then(([row, extra]) => {
    console.log(row);
  })
  .catch(err => {
    console.log(err);
  });

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(schoolRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);

app.use(errorController.get404error);

app.listen(8080);
