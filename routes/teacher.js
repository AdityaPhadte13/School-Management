const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.send("<h1>Teacher Login Page</h1>")
})

router.get('/', (req, res) => {
    res.send("<h1>Teacher Home Page</h1>")
})

module.exports = router