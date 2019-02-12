const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emoji_tool = require('node-emoji');

const regex = require('../../shared/regex');
const utils = require('../tools/utils');

// creates new user account
async function signup(db, email, username, display_name, password, emoji) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: 'invalid database'
        }
    }

    if (!regex.validateEmail(email)) {
        return {
            code: 400,
            data: 'invalid email: ' + email
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: 'invalid username: ' + username
        };
    }

    if (!regex.validateDisplayName(display_name)) {
        return {
            code: 400,
            data: 'invalid display_name: ' + display_name
        };
    }

    if (!regex.validatePassword(password)) {
        return {
            code: 400,
            data: 'invalid password: ' + password
        };
    }

    if (!utils.validateEmoji(emoji)) {
        return {
            code: 400,
            data: 'invalid emoji: ' + emoji
        };
    }

    // convert emoji into correct form
    emoji = emoji_tool.find(emoji).emoji;
    
    // hash the password before storing for security
    const hash = bcrypt.hashSync(password, 10);

    // generatre all others mandatory columns
    const friend_challenges = 0;
    const friend_challenges_won = 0;
    const tiki_tally = 0;
    const polls_created = 0;

    const result = await db('users')
        .insert({
            email, username, display_name, emoji, hash,
            friend_challenges, friend_challenges_won,
            tiki_tally, polls_created
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
        .select('email', 'username', 'display_name', 'emoji', 'friend_challenges', 'friend_challenges_won', 'tiki_tally', 'polls_created')
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
        .select('username', 'display_name', 'emoji', 'tiki_tally')
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
        .select('email', 'username', 'display_name', 'emoji', 'friend_challenges', 'friend_challenges_won', 'tiki_tally', 'polls_created')
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
async function update(db, username, display_name, password, emoji) {
    // put the rows to be updated in here
    const data = {};

    if (!!display_name) {
        data.display_name = display_name;
    }

    if (!!password) {
        // hash the password before storing for security
        data.hash = bcrypt.hashSync(password, 10);
    }

    if (!!emoji) {
        data.emoji = emoji;
    }

    const numUpdates = Object.keys(data).length;
    if (numUpdates < 1 || numUpdates > 3) {
        return {
            code: 400,
            data: 'must pick at least one column to update: display_name, password, emoji'
        }
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
        data: "success"
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
