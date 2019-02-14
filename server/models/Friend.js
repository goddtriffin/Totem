const regex = require('../../shared/regex');
const utils = require('../tools/utils');

// adds a friend
async function add(db, username_1, username_2) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: 'invalid database'
        }
    }

    if (!regex.validateUsername(username_1)) {
        return {
            code: 400,
            data: 'invalid username_1: ' + username_1
        };
    }

    if (!regex.validateUsername(username_2)) {
        return {
            code: 400,
            data: 'invalid username_2: ' + username_2
        };
    }

    const result = await db('friends')
        .insert({
            username_1, username_2
        })
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

// removes a friend
async function remove(db, username_1, username_2) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: 'invalid database'
        }
    }

    if (!regex.validateUsername(username_1)) {
        return {
            code: 400,
            data: 'invalid username_1: ' + username_1
        };
    }

    if (!regex.validateUsername(username_2)) {
        return {
            code: 400,
            data: 'invalid username_2: ' + username_2
        };
    }

    const result = await db('friends')
        .where({
            username_1, username_2
        })
        .del()
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

// returns a list of all friend requests
async function requests(db, username) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: 'invalid database'
        }
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: 'invalid username: ' + username
        };
    }

    const result1 = await db('friends')
        .where({
            username_1: username,
            state: 'pending'
        })
        .select('username_2')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result1.code) {
        return result1;
    }

    const result2 = await db('friends')
        .where({
            username_2: username,
            state: 'pending'
        })
        .select('username_1')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result2.code) {
        return result2;
    }

    const friend_request_usernames = result1
        .concat(result2)
        .map(object => {
            if (object.hasOwnProperty('username_1')) {
                return object.username_1;
            }

            return object.username_2;
        });

    const result3 = await db('users')
        .whereIn('username', friend_request_usernames)
        .select('username', 'display_name', 'emoji', 'tiki_tally')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result3.code) {
        return result3;
    }

    return {
        code: 200,
        data: result3
    };
}

// accepts or rejects a friend request
async function respond(db) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: 'invalid database'
        }
    }

    return {
        code: 501,
        data: 'not implemented'
    };
}

// returns a list of your friends
async function get(db, username) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: 'invalid database'
        }
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: 'invalid username: ' + username
        };
    }

    const result1 = await db('friends')
        .where({
            username_1: username,
            state: 'accepted'
        })
        .select('username_2')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result1.code) {
        return result1;
    }

    const result2 = await db('friends')
        .where({
            username_2: username,
            state: 'accepted'
        })
        .select('username_1')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result2.code) {
        return result2;
    }

    const friend_usernames = result1
        .concat(result2)
        .map(object => {
            if (object.hasOwnProperty('username_1')) {
                return object.username_1;
            }

            return object.username_2;
        });

    const result3 = await db('users')
        .whereIn('username', friend_usernames)
        .select('username', 'display_name', 'emoji', 'tiki_tally')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result3.code) {
        return result3;
    }

    return {
        code: 200,
        data: result3
    };
}

module.exports = {
    add, remove,
    requests, respond,
    get
}
