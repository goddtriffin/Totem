const bcrypt = require('bcryptjs');

// creates new user account
async function signup(req, res, data) {
    data.hash = bcrypt.hashSync(data.hash, 10);

    const result = await req.app.locals.db
        .insert(data)
        .into('users')
        .catch(e => {
            res.status(400).send(e);
            return;
        });
    
    res.status(200).send(result);
}

// authenticates user
async function login(req, res) {
    // todo
}

// returns a list of all users
async function getAll(req, res) {
    const result = await req.app.locals.db
        .select('email', 'username', 'display_name', 'hash', 'emoji', 'friend_challenges', 'friend_challenges_won', 'tiki_score', 'polls_created')
        .table('users');

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
