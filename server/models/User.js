const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// creates new user account
async function signup(req, res, data) {
    // hash the password before storing for security
    data.hash = bcrypt.hashSync(data.hash, 10);

    await req.app.locals.db('users')
        .insert(data)
        .catch(e => {
            res.status(500).send({
                code: 500,
                info: e.originalStack
            });
            return;
        });
    
    if (res.headersSent) {
        return;
    }
    
    // immediately authenticate on successful signup
    const payload = {
        iss: 'Totem',
        sub: data.username
    }

    res.status(200).send(jwt.sign(payload, process.env.JWT_SECRET));
}

// authenticates user
async function login(req, res, data) {
    const result = await req.app.locals.db('users')
        .where('username', data.username)
        .select('hash')
        .catch(e => {
            res.status(500).send({
                code: 500,
                info: e.originalStack
            });
            return;
        });

    if (res.headersSent) {
        return;
    }
    
    // if no results, then no account exists with that username
    if (result.length !== 1) {
        res.status(400).send({
            code: 400,
            info: 'no account found with username: ' + data.username
        });
        return;
    }

    // validate password
    if (!bcrypt.compareSync(data.password, result[0].hash)) {
        res.status(401).send({
            code: 401,
            info: 'wrong password'
        });
        return;
    }

    // authenticate on successful login
    const payload = {
        iss: 'Totem',
        sub: data.username
    }

    res.status(200).send(jwt.sign(payload, process.env.JWT_SECRET));
}

// returns a list of all users
async function getAll(req, res) {
    const result = await req.app.locals.db
        .select('email', 'username', 'display_name', 'emoji', 'friend_challenges', 'friend_challenges_won', 'tiki_score', 'polls_created')
        .table('users')
        .catch(e => {
            res.status(500).send({
                code: 500,
                info: e.originalStack
            });
            return;
        });

    if (res.headersSent) {
        return;
    }

    res.status(200).send(result);
}

// returns a single User by username
async function getByUsername(req, res) {
    // todo
}

module.exports = {
    signup,
    login,
    getAll,
    getByUsername
}
