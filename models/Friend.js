const regex = require('../tools/regex');

// adds a friend
async function add(db, username_1, username_2) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username_1)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username_1)
        };
    }

    if (!regex.validateUsername(username_2)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username_2)
        };
    }

    if (username_1 === username_2) {
        return {
            code: 400,
            data: 'You cannot be friends with yourself.'
        };
    }

    // check if username_1 exists
    const username_1_exists = await require('./User').usernameExists(db, username_1);
    if (typeof username_1_exists !== 'boolean') {
        return username_1_exists;
    }

    if (!username_1_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username_1
        };
    }

    // check if username_2 exists
    const username_2_exists = await require('./User').usernameExists(db, username_2);
    if (typeof username_2_exists !== 'boolean') {
        return username_2_exists;
    }

    if (!username_2_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username_2
        };
    }

    // check to see if they're already friends, or if there is a pending friend request
    const friend_state = await getFriendState(db, username_1, username_2);
    if (friend_state === 'accepted') {
        return {
            code: 400,
            data: 'already friends with: ' + username_2
        };
    } else if (friend_state === 'pending') {
        return {
            code: 400,
            data: 'pending friend request already exists with: ' + username_2
        };
    }

    // friendship is good to go
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

// returns a list of all friend requests
async function requests(db, username) {
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

    const friend_requests_sent = result1.map(friend => friend.username_2);

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

    const friend_requests_received = result2.map(friend => friend.username_1);

    const result3 = await db('users')
        .whereIn('username', friend_requests_sent)
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

    const result4 = await db('users')
        .whereIn('username', friend_requests_received)
        .select('username', 'display_name', 'emoji', 'tiki_tally')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result4.code) {
        return result4;
    }

    return {
        code: 200,
        data: {
            sent: result3,
            received: result4
        }
    };
}

// accepts a friend request
async function accept(db, username_1, username_2) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username_1)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username_1)
        };
    }

    if (!regex.validateUsername(username_2)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username_2)
        };
    }

    // check if username_1 exists
    const username_1_exists = await require('./User').usernameExists(db, username_1);
    if (typeof username_1_exists !== 'boolean') {
        return username_1_exists;
    }

    if (!username_1_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username_1
        };
    }

    // check if username exists
    const username_2_exists = await require('./User').usernameExists(db, username_2);
    if (typeof username_2_exists !== 'boolean') {
        return username_2_exists;
    }

    if (!username_2_exists) {
        return {
            code: 400,
            data: 'user does not exist: ' + username_2
        };
    }

    const result = await db('friends')
        .where({
            username_1: username_2,
            username_2: username_1,
            state: 'pending'
        })
        .update('state', 'accepted')
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
        const friends = await areFriends(db, username_1, username_2);
        if (friends) {
            return {
                code: 400,
                data: 'already friends with: ' + username_2
            };
        } else {
            return {
                code: 400,
                data: 'no friend request found with friend_username: ' + username_2
            };
        }
    }

    return {
        code: 200,
        data: 'success'
    };
}

// returns a list of your friends
async function get(db, username) {
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

    const result1 = await db('friends')
        .where('state', 'accepted')
        .andWhere(builder => {
            builder
                .where('username_1', username)
                .orWhere('username_2', username)
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

    const friend_usernames = result1.map(friendship => {
        if (friendship.username_1 === username) {
            return friendship.username_2;
        }

        return friendship.username_1;
    });

    const result2 = await db('users')
        .whereIn('username', friend_usernames)
        .select('username', 'display_name', 'emoji', 'tiki_tally')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result2.code) {
        return result2;
    }

    return {
        code: 200,
        data: result2
    };
}

// removes a friend
async function remove(db, username_1, username_2) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateUsername(username_1)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username_1)
        };
    }

    if (!regex.validateUsername(username_2)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username_2)
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

// returns the state of the friendship, 'N/A' otherwise
async function getFriendState(db, username_1, username_2) {
    if (username_1 === username_2) {
        return 'N/A';
    }

    const result = await db('friends')
        .where({
            username_1,
            username_2
        })
        .orWhere({
            username_1: username_2,
            username_2: username_1
        })
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

    if (result.length === 1) {
        // friendship exists
        return result[0].state;
    } else {
        // friendship doesn't exist
        return 'N/A';
    }
}

// returns true if the two usernames have a friend relationship, false otherwise
async function areFriends(db, username_1, username_2) {
    if (username_1 === username_2) {
        return false;
    }

    const state = await getFriendState(db, username_1, username_2);
    return state === 'accepted';
}

// returns the friendship states of all given users if they exist
async function getAllFriendStates(db, username, usernames) {
    return await db('friends')
        .where(builder => {
            builder
                .whereIn('username_2', usernames)
                .andWhere('username_1', username)
        })
        .orWhere(builder => {
            builder
                .whereIn('username_1', usernames)
                .andWhere('username_2', username)
        })
        .select()
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
}

module.exports = {
    add, requests,
    accept, get,
    remove,
    getFriendState,
    areFriends,
    getAllFriendStates
}
