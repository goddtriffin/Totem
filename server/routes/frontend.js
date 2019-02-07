const express = require('express');
const router = express.Router();
const auth = require('./auth');

// home route should always link to splash/
router.get('/', (req, res) => {
    res.redirect('/splash');
});

router.use(['/friends', '/personal', 'private', 'public', 'settings', 'tournament'], function (req, res, next) {
    if (!auth.validate(req, res)) {
        if (res.headersSent) {
            return;
        }

        res.redirect('/splash');
        return;
    }

    next();
}); 

// all frontend pages
router.use('/', express.static('../webapp'));

module.exports = router;