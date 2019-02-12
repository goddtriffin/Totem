const router = require('express').Router();

const auth = require('../auth');
const utils = require('../../tools/utils');
const User = require('../../models/User');

router.post('/signup', async (req, res) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        display_name: req.body.display_name,
        password: req.body.password,
        emoji: req.body.emoji
    };

    if (!utils.validateObject(data)) {
        const result = {
            code: 400,
            info: 'mandatory body parameters: email, username, display_name, password, emoji'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await User.signup(
        req.app.locals.db,
        data.email, data.username, data.display_name,
        data.password, data.emoji
    );

    res.status(result.code).send(result);
});

router.post('/login', async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    };

    if (!utils.validateObject(data)) {
        const result = {
            code: 400,
            info: 'mandatory body parameters; username, password'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await User.login(
        req.app.locals.db,
        data.username, data.password
    );

    res.status(result.code).send(result);
});

router.get('/me', auth.validate, async (req, res) => {
    const result = await User.getByUsername(
        req.app.locals.db, req.jwt.sub
    );

    res.status(result.code).send(result);
});

router.get('/profile', auth.validate, async (req, res) => {
    const data = {
        username: req.body.username
    };

    if (!utils.validateObject(data)) {
        const result = {
            code: 400,
            info: 'malformed body parameters; username'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await User.getByUsername(
        req.app.locals.db, data.username
    );

    res.status(result.code).send(result);
});

router.get('/search', auth.validate, async (req, res) => {
    const data = {
        query: req.body.query
    };

    if (!utils.validateObject(data)) {
        const result = {
            code: 400,
            info: 'malformed body parameters; query'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await User.search(
        req.app.locals.db, data.query
    );

    res.status(result.code).send(result);
});

router.get('/all', auth.validate, async (req, res) => {
    const result = await User.all(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/update', auth.validate, async (req, res) => {
    const data = {};

    if (!!req.body.display_name) {
        data.display_name = req.body.display_name;
    }

    if (!!req.body.password) {
        data.password = req.body.password;
    }

    if (!!req.body.emoji) {
        data.emoji = req.body.emoji;

        // validate emoji
        if (emoji.hasEmoji(data.emoji)) {
            // double check that emoji is not in plaintext form
            data.emoji = emoji.find(data.emoji).emoji;
        } else {
            const result = {
                code: 400,
                info: 'unknown emoji: ' + data.emoji
            };
            res.status(result.code).send(result);
            return;
        }
    }

    if (Object.keys(data).length === 0 || !utils.validateObject(data)) {
        const result = {
            code: 400,
            info: 'optional body paramaters allowed: display_name, password, emoji'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await User.update(
        req.app.locals.db, 
        req.jwt.sub,
        data.display_name, data.password, data.emoji
    );

    res.status(result.code).send(result);
});

router.get('/history', auth.validate, async (req, res) => {
    const result = await User.history(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
