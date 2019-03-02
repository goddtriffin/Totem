const express = require('express');
const router = express.Router();
const path = require('path');

// serve up static resources
router.use('/static/css', express.static('static/css'));
router.use('/static/js', express.static('static/js'));
router.use('/static/lib', express.static('static/lib'));
router.use('/static/res', express.static('static/res'));

// root route => splash page
router.get('/', (req, res) => {
    res.sendFile(path.resolve('static/html/splash.html'));
});

module.exports = router;
