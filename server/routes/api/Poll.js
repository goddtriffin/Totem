const router = require('express').Router();

const auth = require('../auth');
const Poll = require('../../models/Poll');

router.post('/personal/create', auth.validate, async (req, res) => {
    const result = await Poll.createPersonal(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.post('/challenge/create', auth.validate, async (req, res) => {
    const result = await Poll.createChallenge(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/challenge/respond', auth.validate, async (req, res) => {
    const result = await Poll.respondToChallengeRequest(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/challenge/requests', auth.validate, async (req, res) => {
    const result = await Poll.getChallengeRequests(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/search', auth.validate, async (req, res) => {
    const result = await Poll.search(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/vote', auth.validate, async (req, res) => {
    const result = await Poll.vote(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
