const router = require('express').Router();

const auth = require('../auth');
const Friend = require('../../models/Friend');

router.post('/add', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Friend.add(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.delete('/remove', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Friend.remove(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/get', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Friend.get(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/requests', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Friend.requests(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/respond', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Friend.respond(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
