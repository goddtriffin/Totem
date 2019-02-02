// creates new user account
async function signup(req, res, data) {
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
        .select('email', 'username', 'display_name', 'hash')
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
