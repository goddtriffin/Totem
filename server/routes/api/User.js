const router = require('express').Router();
const emoji = require('node-emoji');

const utils = require('../../tools/utils');
const auth = require('../auth');
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

    if (!utils.validateObject(data)) {
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

    const result = await User.signup(
        req.app.locals.db,
        data.email, data.username, data.display_name,
        data.hash, data.emoji,
        data.friend_challenges, data.friend_challenges_won,
        data.tiki_score, data.polls_created
    );

    res.status(result.code).send(result);
});

router.post('/login', async (req, res, next) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    };

    if (!utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'malformed body parameters; username, password'
        });
        return;
    }

    const result = await User.login(
        req.app.locals.db,
        data.username, data.password
    );

    res.status(result.code).send(result);
});

router.get('/me', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await User.me(
        req.app.locals.db, req.jwt.sub
    );

    res.status(result.code).send(result);
});

router.get('/profile/:username', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const data = {
        username: req.params.username
    };

    if (!utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'malformed query parameters; /api/user/profile/username (replace username with a real username)'
        });
        return;
    }

    const result = await User.getByUsername(
        req.app.locals.db, data.username
    );

    res.status(result.code).send(result);
});

router.get('/search', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const data = {
        query: req.body.query
    };

    if (!utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'malformed body parameters; query'
        });
        return;
    }

    const result = await User.search(
        req.app.locals.db, data.query
    );

    res.status(result.code).send(result);
});

router.get('/all', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await User.all(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/update', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const data = {};

    if (!!req.body.display_name) {
        data.display_name = req.body.display_name;
    }

    if (!!req.body.password) {
        data.hash = req.body.password;
    }

    if (!!req.body.emoji) {
        data.emoji = req.body.emoji;

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
    }

    if (Object.keys(data).length === 0 || !utils.validateObject(data)) {
        res.status(400).send({
            code: 400,
            info: 'optional body paramaters allowed: display_name, password, emoji'
        });
        return;
    }

    const result = await User.update(
        req.app.locals.db, 
        req.jwt.sub,
        data.display_name, data.hash, data.emoji
    );

    res.status(result.code).send(result);
});

router.get('/history', async (req, res, next) => {
    const authCheck = auth.validate(req, res);
    if (authCheck.code !== 200) {
        res.status(authCheck.code).send(authCheck);
        return;
    }

    const result = await User.history(
        req.app.locals.db
    );

    console.log('history', result);

    res.status(result.code).send(result);
});

module.exports = router;
