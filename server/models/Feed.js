const regex = require('../../shared/regex');
const utils = require('../tools/utils');

const Friend = require('./Friend');

// returns a user's public feed
async function getPublic(db) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    const result = await db('polls')
        .where({
            scope: 'public'
        })
        .select('id', 'display_name', 'theme', 'creator', 'opponent', 'image_1', 'image_2', 'votes_1', 'votes_2', 'state', 'type', 'duration', 'scope', 'start_time', 'end_time')
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

// returns a user's private feed
async function getPrivate(db, username) {
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

    const friends = await Friend.get(db, username);
    const friendUsernames = friends.data.map(f => f.username);
    friendUsernames.push(username);

    const result = await db('polls')
        .whereIn('creator', friendUsernames)
        .orWhereIn('opponent', friendUsernames)
        .select('id', 'display_name', 'theme', 'creator', 'opponent', 'image_1', 'image_2', 'votes_1', 'votes_2', 'state', 'type', 'duration', 'scope', 'start_time', 'end_time')
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


module.exports = {
    getPublic, getPrivate
}
