const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// creates new user account
async function signup(db, email, username, display_name, hash, emoji, friend_challenges, friend_challenges_won, tiki_score, polls_created) {
    // hash the password before storing for security
    hash = bcrypt.hashSync(hash, 10);

    const result = await db('users')
        .insert({
            email, username, display_name, emoji, hash,
            friend_challenges, friend_challenges_won,
            tiki_score, polls_created
        })
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result.code) {
        if (result.data.includes('UNIQUE constraint failed: users.username')) {
            return {
                code: 409,
                data: 'username already exists'
            }
        }

        return result;
    }
    
    // immediately authenticate on successful signup
    const payload = {
        iss: 'Totem',
        sub: username
    }

    return {
        code: 200,
        data: jwt.sign(payload, process.env.JWT_SECRET)
    };
}

// authenticates user
async function login(db, username, password) {
    const result = await db('users')
        .where('username', username)
        .select('hash')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result.code) {
        return result;
    }
    
    // if no results, then no account exists with that username
    if (result.length !== 1) {
        return {
            code: 400,
            data: 'no account found with username: ' + username
        };
    }

    // validate password
    if (!bcrypt.compareSync(password, result[0].hash)) {
        return {
            code: 401,
            data: 'wrong password'
        };
    }

    // authenticate on successful login
    const payload = {
        iss: 'Totem',
        sub: username
    }

    return {
        code: 200,
        data: jwt.sign(payload, process.env.JWT_SECRET)
    };
}

// returns a single user's data by username
async function getByUsername(db, username) {
    const result = await db('users')
        .where('username', username)
        .select('email', 'username', 'display_name', 'emoji', 'friend_challenges', 'friend_challenges_won', 'tiki_score', 'polls_created')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result.code) {
        return result;
    }
    
    // if no results, then no account exists with that username
    if (result.length !== 1) {
        return {
            code: 400,
            data: 'no account found with username: ' + username
        };
    }

    return {
        code: 200,
        data: result[0]
    }
}

// returns a list of users' data that match the given query
async function search(db, query) {
    const result = await db('users')
        .where('username', 'like', '%' + query + '%')
        .select('username', 'display_name', 'emoji')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result.code) {
        return result;
    }

    return {
        code: 200,
        data: result
    }
}

// returns a list of all users
async function all(db) {
    const result = await db('users')
        .select('email', 'username', 'display_name', 'emoji', 'friend_challenges', 'friend_challenges_won', 'tiki_score', 'polls_created')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result.code) {
        return result;
    }

    return {
        code: 200,
        data: result
    }
}

// updates user account information
async function update(db, username, display_name, hash, emoji) {
    // put the rows to be updated in here
    const data = {};

    if (!!display_name) {
        data.display_name = display_name;
    }

    if (!!hash) {
        // hash the password before storing for security
        data.hash = bcrypt.hashSync(hash, 10);
    }

    if (!!emoji) {
        data.emoji = emoji;
    }

    const result = await db('users')
        .where('username', username)
        .update(data)
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result.code) {
        return result;
    }

    return {
        code: 200,
        info: "success"
    };
}

// returns the entire history of a user
async function history(db) {
    return {
        code: 501,
        data: 'not implemented'
    };
}

module.exports = {
    signup, login,
    getByUsername,
    search, all,
    update,
    history
}
