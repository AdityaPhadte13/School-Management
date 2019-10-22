const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const schoolRouter = require("./routes/school");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
const adminRouter = require("./routes/admin");

const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(schoolRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);

app.use(errorController.get404error);

app.listen(8080);
