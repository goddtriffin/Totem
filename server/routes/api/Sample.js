const router = require('express').Router();

const auth = require('../auth');
const Sample = require('../../models/Sample');

router.get('/sample', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Sample.routeModel(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
