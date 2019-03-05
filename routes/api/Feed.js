const router = require('express').Router();

const Auth = require('../Auth');
const Feed = require('../../models/Feed');

router.get('/public', Auth.validate, async (req, res) => {
    const data = {
        sort: req.query.sort
    };

    const result = await Feed.getPublic(
        req.app.locals.db,
        data.sort
    );

    res.status(result.code).send(result);
});

router.get('/private', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub,
        sort: req.query.sort
    };

    const result = await Feed.getPrivate(
        req.app.locals.db,
        data.username, data.sort
    );

    res.status(result.code).send(result);
});

module.exports = router;
