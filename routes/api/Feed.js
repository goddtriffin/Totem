const router = require('express').Router();

const Auth = require('../Auth');
const Feed = require('../../models/Feed');

router.get('/public', Auth.validate, async (req, res) => {
    const result = await Feed.getPublic(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/private', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub
    };

    const result = await Feed.getPrivate(
        req.app.locals.db,
        data.username
    );

    res.status(result.code).send(result);
});

module.exports = router;
