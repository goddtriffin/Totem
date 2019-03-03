const express = require('express');
const router = express.Router();

// example API route
// router.use('/sample', require('./Sample'));

router.use('/user', require('./User'));
router.use('/user/friend', require('./Friend'));

router.use('/poll', require('./Poll'));
router.use('/feed', require('./Feed'));

module.exports = router;
