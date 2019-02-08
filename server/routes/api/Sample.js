const router = require('express').Router();

const auth = require('../auth');
const Sample = require('../../models/Sample');

router.get('/sample', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(401).send(authCheck);
        return;
    }

    await Sample.routeModel(req, res);
});

module.exports = router;
