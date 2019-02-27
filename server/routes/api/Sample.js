const router = require('express').Router();

const Auth = require('../Auth');
const utils = require('../../tools/utils');
const Sample = require('../../models/Sample');

router.get('/sample', Auth.validate, async (req, res) => {
    const result = await Sample.routeModel(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
