const router = require('express').Router();
const emoji = require('node-emoji');

const auth = require('./auth');
const User = require('../../models/User');

router.post('/signup', async (req, res, next) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        display_name: req.body.display_name,
        hash: req.body.password,
        emoji: req.body.emoji,
        friend_challenges: 0,
        friend_challenges_won: 0,
        tiki_score: 0,
        polls_created: 0
    };

    if (!req.app.locals.utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'malformed body parameters: email, username, display_name, password, emoji'
        });
        return;
    }

    // validate emoji
    if (emoji.hasEmoji(data.emoji)) {
        // double check that emoji is not in plaintext form
        data.emoji = emoji.find(data.emoji).emoji;
    } else {
        res.status(400).send({
            code: 400,
            info: 'unknown emoji: ' + data.emoji
        });
        return;
    }

    await User.signup(req, res, data);
});

router.post('/login', async (req, res, next) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    };

    if (!req.app.locals.utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'malformed body parameters; username, password'
        });
        return;
    }

    await User.login(req, res, data);
});

router.get('/me', async (req, res, next) => {
    if (!auth.validate(req, res)) return;

    await User.me(req, res);
});

router.get('/all', async (req, res, next) => {
    if (!auth.validate(req, res)) return;

    await User.all(req, res);
});

router.get('/search', async (req, res, next) => {
    if (!auth.validate(req, res)) return;

    const data = {
        query: req.body.query
    };

    if (!req.app.locals.utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'malformed body parameters; query'
        });
        return;
    }

    await User.search(req, res, data);
});

router.get('/search/username', async (req, res, next) => {
    if (!auth.validate(req, res)) return;

    await User.searchByUsername(req, res);
});

router.put('/update', async (req, res, next) => {
    if (!auth.validate(req, res)) return;

    await User.update(req, res);
});

router.get('/history', async (req, res, next) => {
    if (!auth.validate(req, res)) return;

    await User.history(req, res);
});

module.exports = router;
