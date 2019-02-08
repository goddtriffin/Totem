const router = require('express').Router();

const auth = require('../auth');
const Sample = require('../../models/Sample');

router.get('/sample', async (req, res, next) => {
    if (!auth.validate(req, res)) return;

    await Sample.routeModel(req, res);
});

module.exports = router;
