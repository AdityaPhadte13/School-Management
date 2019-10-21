const path = require('path');
const express = require('express');

const router = express.Router();

router.get(['/','/home'], (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
})

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'about.html'));
})

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'contact.html'));
})

module.exports = router