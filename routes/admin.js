const express = require('express');

const router = express.Router();

router.get('/admin/login', (req, res) => {
    res.send("<h1>Admin Login Page</h1>")
})

module.exports = router