const express = require('express');

const router = express.Router();

router.get('/teacher/login', (req, res) => {
    res.send("<h1>Teacher Login Page</h1>")
})

module.exports = router