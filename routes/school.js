const rootPath = require('../util/path')
const path = require('path');
const express = require('express');

const router = express.Router();

router.get(['/', '/home'], (req, res) => {
    res.sendFile(path.join(rootPath, 'views', 'index.html'));
})

router.get('/about', (req, res) => {
    res.sendFile(path.join(rootPath, 'views', 'about.html'));
})

router.get('/contact', (req, res) => {
    res.sendFile(path.join(rootPath, 'views', 'contact.html'));
})

module.exports = router