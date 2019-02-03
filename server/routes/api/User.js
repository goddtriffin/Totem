const router = require('express').Router();

const emoji = require('node-emoji');
const User = require('../../models/User');

router.get('/signup', async (req, res, next) => {
    const data = {
        email: req.query.email,
        username: req.query.username,
        display_name: req.query.display_name,
        hash: req.query.password,
        emoji: req.query.emoji,
        friend_challenges: 0,
        friend_challenges_won: 0,
        tiki_score: 0,
        polls_created: 0
    };

    if (!req.app.locals.utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'malformed parameters: /api/signup?email=&username=&display_name=&password=&emoji='
        });
        return;
    }

    if (!emoji.hasEmoji(data.emoji)) {
        res.status(400).send({
            code: 400,
            info: 'unknown emoji: ' + data.emoji
        });
        return;
    }

    await User.signup(req, res, data);
});

router.get('/login', async (req, res, next) => {
    const data = {
        username: req.query.username,
        password: req.query.password
    };

    if (!req.app.locals.utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'malformed parameters; /api/login?username=&password='
        });
        return;
    }

    await User.login(req, res, data);
});

router.get('/users', async (req, res, next) => {
    await User.getAll(req, res);
});

module.exports = router;
