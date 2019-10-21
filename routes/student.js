const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("<h1>HomePage</h1>")
})

router.get('/student/login', (req, res) => {
    res.send("<h1>Student Login Page</h1>")
})

module.exports = router