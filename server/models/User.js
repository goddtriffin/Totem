const bcrypt = require('bcryptjs');

// creates new user account
async function signup(req, res, data) {
    data.hash = bcrypt.hashSync(data.hash, 10);

    const result = await req.app.locals.db
        .insert(data)
        .into('users')
        .catch(e => {
            res.status(500).send({
                code: 500,
                info: e.originalStack
            });
            return;
        });
    
    res.status(200).send(result);
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

    if (!bcrypt.compareSync(data.password, result[0].hash)) {
        res.status(401).send({
            code: 401,
            info: 'wrong password'
        });
        return;
    }

    res.status(200).send('Authorized!');
}

// returns a list of all users
async function getAll(req, res) {
    const result = await req.app.locals.db
        .select('email', 'username', 'display_name', 'hash', 'emoji', 'friend_challenges', 'friend_challenges_won', 'tiki_score', 'polls_created')
        .table('users')
        .catch(e => {
            res.status(500).send({
                code: 500,
                info: e.originalStack
            })
        });

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
