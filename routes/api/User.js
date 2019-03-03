const router = require('express').Router();

const Auth = require('../Auth');
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

    const result = await User.login(
        req.app.locals.db,
        data.username, data.password
    );

    res.status(result.code).send(result);
});

router.get('/me', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub
    };

    const result = await User.getByUsername(
        req.app.locals.db,
        data.username
    );

    res.status(result.code).send(result);
});

router.get('/profile/:username', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub,
        username_query: req.params.username
    };

    const result = await User.getByUsername(
        req.app.locals.db,
        data.username, data.username_query
    );

    res.status(result.code).send(result);
});

router.get('/search', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub,
        username_query: req.query.username
    };

    const result = await User.search(
        req.app.locals.db,
        data.username, data.username_query
    );

    res.status(result.code).send(result);
});

router.get('/all', Auth.validate, async (req, res) => {
    const result = await User.all(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/update', Auth.validate, async (req, res) => {
    // store which optional parameter updates are chosen
    const data = {
        username: req.jwt.sub
    };

    // check if optional display_name update parameter is set
    if (!!req.body.display_name) {
        data.display_name = req.body.display_name;
    }

    // check if optional password update parameter is set
    if (!!req.body.password) {
        data.password = req.body.password;
    }

    // check if optional emoji update parameter is set
    if (!!req.body.emoji) {
        data.emoji = req.body.emoji;
    }

    const result = await User.update(
        req.app.locals.db, 
        data.username, data.display_name,
        data.password, data.emoji
    );

    res.status(result.code).send(result);
});

router.get('/history', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub
    };

    const result = await User.history(
        req.app.locals.db,
        data.username
    );

    res.status(result.code).send(result);
});

module.exports = router;
