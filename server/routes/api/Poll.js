const router = require('express').Router();

const auth = require('../auth');
const Poll = require('../../models/Poll');

router.post('/personal/create', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Poll.createPersonal(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.post('/challenge/create', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Poll.createChallenge(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/challenge/respond', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Poll.respondToChallengeRequest(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/challenge/requests', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Poll.getChallengeRequests(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/search', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Poll.search(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/vote', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await Poll.vote(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
