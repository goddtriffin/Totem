const router = require('express').Router();

const Auth = require('../Auth');
const Poll = require('../../models/Poll');

router.post('/personal/create', Auth.validate, async (req, res) => {
    const result = await Poll.createPersonal(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.post('/challenge/create', Auth.validate, async (req, res) => {
    const result = await Poll.createChallenge(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/challenge/respond', Auth.validate, async (req, res) => {
    const result = await Poll.respondToChallengeRequest(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/challenge/requests', Auth.validate, async (req, res) => {
    const result = await Poll.getChallengeRequests(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/search', Auth.validate, async (req, res) => {
    const result = await Poll.search(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/vote', Auth.validate, async (req, res) => {
    const result = await Poll.vote(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
