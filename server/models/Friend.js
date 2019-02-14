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

// returns a list of your friends
async function get(db) {
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

// returns a list of all friend requests
async function requests(db) {
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

module.exports = {
    add, remove, get,
    requests, respond
}
