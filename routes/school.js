const express = require('express');

const router = express.Router();

router.get(['/','/home'], (req, res) => {
    res.send("<h1>HomePage</h1>")
})

router.get('/about', (req, res) => {
    res.send("<h1>About Page</h1>")
})

router.get('/contact', (req, res) => {
    res.send("<h1>Contact Page</h1>")
})

module.exports = router