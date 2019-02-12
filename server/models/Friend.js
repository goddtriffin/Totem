const utils = require('../tools/utils');

// adds a friend
async function add(db) {
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

// removes a friend
async function remove(db) {
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
