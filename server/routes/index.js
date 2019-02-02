const router = require('express').Router();

// basic url
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// all API routes
router.use('/api', require('./api'));

// any other url, send 404
router.use((req, res, next) => {
    res.status(404).send('404 ;)');
});

module.exports = router;
