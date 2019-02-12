const router = require('express').Router();

const auth = require('../auth');
const Sample = require('../../models/Sample');

router.get('/sample', auth.validate, async (req, res) => {
    const result = await Sample.routeModel(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
