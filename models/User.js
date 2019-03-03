const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emoji_tool = require('node-emoji');

const regex = require('../shared/regex');
const utils = require('../tools/utils');

const Friend = require('./Friend');

// creates new user account
async function signup(db, email, username, display_name, password, emoji) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateEmail(email)) {
        return {
            code: 400,
            data: regex.getInvalidEmailResponse(email)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    if (!regex.validateDisplayName(display_name)) {
        return {
            code: 400,
            data: regex.getInvalidDisplayNameResponse(display_name)
        };
    }

    if (!regex.validatePassword(password)) {
        return {
            code: 400,
            data: regex.getInvalidPasswordResponse(password)
        };
    }

    if (!utils.validateEmoji(emoji)) {
        return {
            code: 400,
            data: utils.getInvalidEmojiResponse(emoji)
        };
    }

    // convert emoji into correct form
    emoji = emoji_tool.find(emoji).emoji;
    
    // hash the password before storing for security
    const hash = bcrypt.hashSync(password, 10);

    const result = await db('users')
        .insert({
            email, username, display_name, emoji, hash
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
            };
        }

        if (result.data.includes('UNIQUE constraint failed: users.email')) {
            return {
                code: 409,
                data: 'email already exists'
            };
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
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    if (!regex.validatePassword(password)) {
        return {
            code: 400,
            data: regex.getInvalidPasswordResponse(password)
        };
    }

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
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    const result = await db('users')
        .where('username', username)
        .select('email', 'username', 'display_name', 'emoji', 'challenges_played', 'challenges_won', 'tiki_tally', 'polls_created')
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

    // remove 'challenges_played' and 'challenges_won', replace with 'win_rate'
    const data = result[0];
    data['win_rate'] = (data['challenges_played'] === 0)? 0 : data['challenges_won'] / data['challenges_played'];
    delete data['challenges_won'];
    delete data['challenges_played'];

    return {
        code: 200,
        data
    };
}

// returns a list of users' data that match the given username query
async function search(db, username, username_query) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    if (!regex.validateUsernameQuery(username_query)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameQueryResponse(username_query)
        };
    }

    const result = await db('users')
        .whereNot('username', username)
        .andWhere('username', 'like', '%' + username_query + '%')
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

    // Show which users you are already friends with.
    // get a list of this user's friends by their username
    const friends = await Friend.get(db, username);
    const friendUsernames = friends.data.map(f => f.username);
    friendUsernames.push(username);

    const users = result.map(user => {
        user.friends = friendUsernames.includes(user.username);
        return user;
    });

    return {
        code: 200,
        data: users
    };
}

// returns a list of all users
async function all(db) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    const result = await db('users')
        .select('email', 'username', 'display_name', 'emoji', 'challenges_played', 'challenges_won', 'tiki_tally', 'polls_created')
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
    };
}

// updates user account information
async function update(db, username, display_name, password, emoji) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    // grab user profile info to check if the parameters
    // chosen are identical to the values already set
    let user = await db('users')
        .where('username', username)
        .select('display_name', 'hash', 'emoji')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!user.code) {
        return result;
    }

    // if no results, then no account exists with that username
    if (user.length !== 1) {
        return {
            code: 400,
            data: 'no account found with username: ' + username
        };
    } else {
        user = user[0];
    }

    // put the row's columns to be updated in here
    const data = {};

    // check if display_name was set to be updated, then validate
    if (!!display_name) {
        if (!regex.validateDisplayName(display_name)) {
            return {
                code: 400,
                data: regex.getInvalidDisplayNameResponse(display_name)
            };
        }

        // only update display_name if it is different than what is already set
        if (display_name === user.display_name) {
            return {
                code: 400,
                data: 'must choose different display_name, user display_name already is: ' + display_name
            };
        }

        data.display_name = display_name;
    }

    // check if password was set to be updated, then validate
    if (!!password) {
        if (!regex.validatePassword(password)) {
            return {
                code: 400,
                data: regex.getInvalidPasswordResponse(password)
            };
        }

        // only update password if it is different than what is already set
        if (bcrypt.compareSync(password, user.hash)) {
            return {
                code: 400,
                data: 'must choose different password, user password already is: ' + password
            };
        }

        // hash the password before storing for security
        data.hash = bcrypt.hashSync(password, 10);
    }

    // check if emoji was set to be updated, then validate, then convert
    if (!!emoji) {
        if (!utils.validateEmoji(emoji)) {
            return {
                code: 400,
                data: utils.getInvalidEmojiResponse(emoji)
            };
        }

        // convert emoji parameter into emoji form (single char / graphic)
        emoji = emoji_tool.find(emoji).emoji;

        // only update emoji if it is different than what is already set
        if (emoji === user.emoji) {
            return {
                code: 400,
                data: 'must choose different emoji, user emoji already is: ' + emoji
            };
        }

        // convert emoji into correct form
        data.emoji = emoji;
    }

    // check if no optional update parameters were chosen
    const numUpdates = Object.keys(data).length;
    if (numUpdates < 1 || numUpdates > 3) {
        return {
            code: 400,
            data: 'must set, at a minimum, one of the following optional parameters to update: display_name, password, emoji'
        };
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
async function history(db, username) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    const result = await db('history')
        .where('username', username)
        .select('poll', 'vote')
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
    };
}

// increases the user's 'polls_created' by the parameter 'count'
async function incrementPollsCreated(db, username, count) {
    const result = await db('users')
        .where('username', username)
        .increment('polls_created', count)
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result.code) {
        return result;
    }

    return {};
}

module.exports = {
    signup, login,
    getByUsername,
    search, all,
    update,
    history,
    incrementPollsCreated
}
