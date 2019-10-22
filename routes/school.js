const rootPath = require('../util/path')
const path = require('path');
const express = require('express');

const router = express.Router();

router.get(['/', '/home'], (req, res) => {
    res.render('index',{ 
        pageTitle: "Home",
        path: '/home'
     });
})

router.get('/about', (req, res) => {
    res.render('about',{ 
        pageTitle: "About",
        path: '/about' 
    });
})

router.get('/contact', (req, res) => {
    res.render('contact',{ 
        pageTitle: "Contact Us",
        path: '/contact'
     });
})

module.exports = router;