const express = require('express');
const router = express.Router();
const path = require('path');
const Auth = require('./Auth');

// home route should always link to splash/
router.get('/', (req, res) => {
    res.redirect('/splash');
});

// these routes need auth to work
const authed_pages = ['/friends', '/personal', '/private', '/public', '/settings', '/tournament'];
router.use(authed_pages, (req, res, next) => {
    // if (!auth.validate(req, res)) {
    //     if (res.headersSent) {
    //         return;
    //     }

    //     res.redirect('/splash');
    //     return;
    // }

    next();
}); 

// all frontend pages
router.use('/', express.static('webapp'));

router.use('/test', (req, res) => {
    res.sendFile(path.resolve('static/html/test.html'));
});

module.exports = router;
