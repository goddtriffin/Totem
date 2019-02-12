const router = require('express').Router();

const auth = require('../auth');
const Friend = require('../../models/Friend');

router.post('/add', auth.validate, async (req, res) => {
    const result = await Friend.add(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.delete('/remove', auth.validate, async (req, res) => {
    const result = await Friend.remove(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/get', auth.validate, async (req, res) => {
    const result = await Friend.get(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/requests', auth.validate, async (req, res) => {
    const result = await Friend.requests(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/respond', auth.validate, async (req, res) => {
    const result = await Friend.respond(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
