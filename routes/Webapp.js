const express = require('express');
const router = express.Router();
const path = require('path');

// home route should always link to splash/
router.get('/', (req, res) => {
    res.redirect('/splash');
});

// all frontend pages
router.use('/', express.static('webapp'));

router.use('/test', (req, res) => {
    res.sendFile(path.resolve('static/html/test.html'));
});

module.exports = router;
