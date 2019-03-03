const express = require('express');
const router = express.Router();

router.use('/static/css', express.static('static/css'));
router.use('/static/js', express.static('static/js'));
router.use('/static/lib', express.static('static/lib'));
router.use('/static/res', express.static('static/res'));
router.use('/static/uploads', express.static('static/uploads'));

module.exports = router;
