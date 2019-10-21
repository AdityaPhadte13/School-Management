const express = require('express');
const bodyParser = require('body-parser');

const schoolRouter = require('./routes/school');
const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const adminRouter = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(schoolRouter)
app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
app.use('/admin',adminRouter);

app.use((req, res, next) => {
	res.status(404).send("<h1>404 Page Not Found</h1>");
})


app.listen(3000);