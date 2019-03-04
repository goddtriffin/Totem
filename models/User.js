const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emoji_tool = require('node-emoji');
const crypto = require('crypto');

const regex = require('../tools/regex');
const email_tool = require('../tools/email');

// creates new user account
async function signup(db, email, username, display_name, password, emoji, sendVerificationEmail) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
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

    if (!regex.validateEmoji(emoji)) {
        return {
            code: 400,
            data: regex.getInvalidEmojiResponse(emoji)
        };
    }

    // convert emoji into correct form
    emoji = emoji_tool.find(emoji).emoji;
    
    // hash the password before storing for security
    const hash = bcrypt.hashSync(password, 10);

    // create random hash for account verification purposes
    const verificationHash = crypto.randomBytes(20).toString('hex');
    if (typeof verificationHash !== 'string') {
        return {
            code: 500,
            data: 'error creating random verification hash'
        };
    }

    const result1 = await db('users')
        .insert({
            email, username, display_name, emoji, hash
        })
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result1.code) {
        if (result1.data.includes('UNIQUE constraint failed: users.username')) {
            return {
                code: 409,
                data: 'username already exists'
            };
        }

        if (result1.data.includes('UNIQUE constraint failed: users.email')) {
            return {
                code: 409,
                data: 'email already exists'
            };
        }

        return result1;
    }

    // store random hash for account verification purposes
    const result2 = await db('account_verification')
        .insert({
            username, email,
            hash: verificationHash
        })
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result2.code) {
        return result2;
    }

    // send account verification email
    if (sendVerificationEmail) {
        email_tool.sendVerificationEmail(email, verificationHash);
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
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
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
async function getByUsername(db, username, username_query) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
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
        .where('username', username_query)
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
            data: 'no account found with username: ' + username_query
        };
    }

    // remove 'challenges_played' and 'challenges_won', replace with 'win_rate'
    const data = result[0];
    data['win_rate'] = (data['challenges_played'] === 0)? 0 : data['challenges_won'] / data['challenges_played'];
    delete data['challenges_won'];
    delete data['challenges_played'];

    // set the user's friend state
    if (username !== username_query) {
        const state = await require('./Friend').getFriendState(db, username, username_query);
        if (!(typeof state === 'string')) {
            return state;
        }

        data.friend_state = state;
    }

    return {
        code: 200,
        data
    };
}

// returns a list of users' data that match the given username query
async function search(db, username, username_query) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
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

    // set friendship states of all user search results
    const usernames = result.map(user => user.username);
    const friend_states = await require('./Friend').getAllFriendStates(db, username, usernames);
    if (!Array.isArray(friend_states)) {
        return friend_states;
    }

    // cycle through all user search results
    for (let i=0; i<result.length; i++) {
        // cycle through all friend states returned
        for (let j=0; j<friend_states.length; j++) {
            if (friend_states[j].username_1 === result[i].username || friend_states[j].username_2 === result[i].username) {
                result[i].friend_state = friend_states[j].state;
                break;
            }
        }

        if (!result[i].friend_state) {
            result[i].friend_state = 'N/A';
        }
    }

    return {
        code: 200,
        data: result
    };
}

// updates user account information
async function update(db, username, display_name, emoji) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
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

    // check if emoji was set to be updated, then validate, then convert
    if (!!emoji) {
        if (!regex.validateEmoji(emoji)) {
            return {
                code: 400,
                data: regex.getInvalidEmojiResponse(emoji)
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
    if (numUpdates < 1 || numUpdates > 2) {
        return {
            code: 400,
            data: 'must set, at a minimum, one of the following optional parameters to update: display_name, emoji'
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

    if (result !== 1) {
        return {
            code: 400,
            data: 'user does not exist: ' + username
        };
    }

    return {
        code: 200,
        data: "success"
    };
}

// returns the entire history of a user
async function history(db, username) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    // check if username exists
    const username_exists = await require('./User').usernameExists(db, username);
    if (typeof username_exists !== 'boolean') {
        return username_exists;
    }

    if (!username_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username
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

// verifies the user account's email
async function verifyEmail(db, username, email, hash) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    if (!regex.validateEmail(email)) {
        return {
            code: 400,
            data: regex.getInvalidEmailResponse(email)
        };
    }

    if (!regex.validateEmailVerificationHash(hash)) {
        return {
            code: 400,
            data: regex.getInvalidEmailVerificationHashResponse(hash)
        };
    }

    // check if username exists
    const username_exists = await require('./User').usernameExists(db, username);
    if (typeof username_exists !== 'boolean') {
        return username_exists;
    }

    if (!username_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username
        };
    }

    // check if account has unverified email
    const result1 = await db('account_verification')
        .where({
            username, email
        })
        .select()
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result1.code) {
        return result1;
    }

    if (result1.length !== 1) {
        return {
            code: 400,
            data: 'this account does not have an unverified email'
        };
    }

    // delete the row with the correct username, email, hash
    const result2 = await db('account_verification')
        .where({
            username, email, hash
        })
        .del()
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result2.code) {
        return result;
    }

    if (result2 !== 1) {
        return {
            code: 400,
            data: 'incorrect email verification hash'
        };
    }

    // set user account to verified
    const result3 = await db('users')
        .where({
            username, email
        })
        .update('verified', 1)
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result3.code) {
        return result;
    }

    if (result3 !== 1) {
        return {
            code: 400,
            data: 'no user account found: username=' + username + ' email=' + email
        };
    }

    return {
        code: 200,
        data: 'success'
    };
}

// sends an email with the forgotten username
async function forgotUsername(db, email) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateEmail(email)) {
        return {
            code: 400,
            data: regex.getInvalidEmailResponse(email)
        };
    }

    // check if account has unverified email
    const result = await db('users')
        .where('email', email)
        .select('username', 'verified')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result.code) {
        return result;
    }

    if (result.length !== 1) {
        return {
            code: 400,
            data: 'no user account found: ' + email
        };
    }

    if (!result[0].verified) {
        return {
            code: 400,
            data: 'user email is not verified'
        };
    }

    email_tool.sendForgotUsernameEmail(email, result[0].username);

    return {
        code: 200,
        data: 'email sent'
    };
}

// sends an email with a link to reset the password
async function forgotPassword(db, username) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    // check if username exists
    const username_exists = await require('./User').usernameExists(db, username);
    if (typeof username_exists !== 'boolean') {
        return username_exists;
    }

    if (!username_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username
        };
    }

    // check if account has unverified email
    const result1 = await db('users')
        .where('username', username)
        .select('email', 'verified')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result1.code) {
        return result1;
    }

    if (result1.length !== 1) {
        return {
            code: 400,
            data: 'no user account found: ' + username
        };
    }

    if (!result1[0].verified) {
        return {
            code: 400,
            data: 'user email is not verified'
        };
    }

    // create random hash for account verification purposes
    const verificationHash = crypto.randomBytes(20).toString('hex');
    if (typeof verificationHash !== 'string') {
        return {
            code: 500,
            data: 'error creating random verification hash'
        };
    }

    // store random hash for account verification purposes
    const result2 = await db('renew_password_verification')
        .insert({
            username,
            email: result1[0].email,
            hash: verificationHash
        })
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result2.code) {
        return result2;
    }

    email_tool.sendForgotPasswordEmail(result1[0].email, verificationHash);

    return {
        code: 200,
        data: 'email sent'
    };
}

async function renewPassword(db, username, email, hash, newPassword) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    if (!regex.validateEmail(email)) {
        return {
            code: 400,
            data: regex.getInvalidEmailResponse(email)
        };
    }

    if (!regex.validateEmailVerificationHash(hash)) {
        return {
            code: 400,
            data: regex.getInvalidEmailVerificationHashResponse(hash)
        };
    }

    if (!regex.validatePassword(newPassword)) {
        return {
            code: 400,
            data: regex.getInvalidPasswordResponse(newPassword)
        };
    }

    // check if username exists
    const username_exists = await require('./User').usernameExists(db, username);
    if (typeof username_exists !== 'boolean') {
        return username_exists;
    }

    if (!username_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username
        };
    }

    // check if account is in the process of renewing its password
    const result1 = await db('renew_password_verification')
        .where({
            username, email
        })
        .select('hash')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result1.code) {
        return result1;
    }

    if (result1.length !== 1) {
        return {
            code: 400,
            data: 'this user is not in the process of renewing their password'
        };
    }

    if (result1[0].hash !== hash) {
        return {
            code: 400,
            data: 'incorrect renew password verification hash'
        };
    }

    // get the user's old password
    const result2 = await db('users')
        .where({
            username, email
        })
        .select('hash')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result2.code) {
        return result2;
    }

    if (result2.length !== 1) {
        return {
            code: 400,
            data: 'no user account found: username=' + username + ' email=' + email
        };
    }

    // check to make sure the new password doesn't match the old password
    if (bcrypt.compareSync(newPassword, result2[0].hash)) {
        return {
            code: 400,
            data: 'must choose different password, user password already is: ' + newPassword
        };
    }

    // hash the password before storing for security
    const newHash = bcrypt.hashSync(newPassword, 10);

    // store the now hashed new password
    const result3 = await db('users')
        .where({
            username, email
        })
        .update('hash', newHash)
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result3.code) {
        return resul3;
    }

    if (result3 !== 1) {
        return {
            code: 400,
            data: 'no user account found: username=' + username + ' email=' + email
        };
    }

    // delete the row with the correct username, email, hash
    const result4 = await db('renew_password_verification')
        .where({
            username, email, hash
        })
        .del()
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result4.code) {
        return result4;
    }

    if (result4 !== 1) {
        return {
            code: 400,
            data: 'incorrect renew password verification hash: username=' + username + ' email=' + email
        };
    }

    return {
        code: 200,
        data: 'success'
    };
}

// increases the user's 'polls_created' by the parameter 'count'
async function incrementPollsCreated(db, username, count) {
    // check if username exists
    const username_exists = await require('./User').usernameExists(db, username);
    if (typeof username_exists !== 'boolean') {
        return username_exists;
    }

    if (!username_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username
        };
    }

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

// increases the user's 'tiki_tally' by the parameter 'count'
async function incrementTikiTally(db, username, count) {
    // check if username exists
    const username_exists = await require('./User').usernameExists(db, username);
    if (typeof username_exists !== 'boolean') {
        return username_exists;
    }

    if (!username_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username
        };
    }

    const result = await db('users')
        .where('username', username)
        .increment('tiki_tally', count)
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

// returns true if a user with the given username exists, false otherwise
async function usernameExists(db, username) {
    const result = await db('users')
        .where('username', username)
        .select()
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result.code) {
        return result;
    }

    return result.length === 1;
}

module.exports = {
    signup, login,
    getByUsername,
    search,
    update,
    history,
    verifyEmail,
    forgotUsername,
    forgotPassword, renewPassword,
    incrementPollsCreated,
    incrementTikiTally,
    usernameExists
}
