const router = require('express').Router();

const User = require('../../models/User');

router.get('/signup', async (req, res, next) => {
    const data = {
        email: req.query.email,
        username: req.query.username,
        display_name: req.query.display_name,
        hash: req.query.password
    };

    if (!req.app.locals.utils.validateObject(data, ['email', 'username', 'display_name', 'hash'])) {
        res.status(400).send('400: malformed parameters; /api/signup?email=&username=&display_name=&password=');
        return;
    }

    await User.signup(req, res, data);
});

router.get('/users', async (req, res, next) => {
    await User.getAll(req, res);
});

module.exports = router;
