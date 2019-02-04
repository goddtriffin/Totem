const router = require('express').Router();

router.use('/user', require('./User'));

module.exports = router;
