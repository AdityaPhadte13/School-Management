const express = require('express');
const bodyParser = require('body-parser');

const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const adminRouter = require('./routes/admin');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(studentRouter);
app.use(teacherRouter);
app.use(adminRouter);


app.listen(3000);