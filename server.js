const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');

const schoolRouter = require('./routes/school');
const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const adminRouter = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(schoolRouter)
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


app.listen(3000);