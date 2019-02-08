const router = require('express').Router();

// example API route
// router.use('/sample', require('./Sample'));

router.use('/user', require('./User'));

module.exports = router;
