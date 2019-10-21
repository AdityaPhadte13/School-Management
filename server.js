const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send("hello this will be a nice html website")
}) 

app.listen(3000);