const router = require('express').Router();

const Auth = require('../Auth');
const Friend = require('../../models/Friend');

router.post('/add', Auth.validate, async (req, res) => {
    const result = await Friend.add(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.delete('/remove', Auth.validate, async (req, res) => {
    const result = await Friend.remove(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/get', Auth.validate, async (req, res) => {
    const result = await Friend.get(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/requests', Auth.validate, async (req, res) => {
    const result = await Friend.requests(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/respond', Auth.validate, async (req, res) => {
    const result = await Friend.respond(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
