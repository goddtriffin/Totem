const regex = require('../shared/regex');
const utils = require('../tools/utils');

const User = require('./User');
const Friend = require('./Friend');

// creates a new personal poll
async function createPersonal(db, display_name, theme, creator, duration, scope, image_1, image_2) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateDisplayName(display_name)) {
        return {
            code: 400,
            data: regex.getInvalidDisplayNameResponse(display_name)
        };
    }

    if (!regex.validateTheme(theme)) {
        return {
            code: 400,
            data: regex.getInvalidThemeResponse(theme)
        };
    }

    if (!regex.validateUsername(creator)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(creator)
        };
    }

    if (!regex.validateDuration(duration)) {
        return {
            code: 400,
            data: regex.getInvalidDurationResponse(duration)
        };
    }

    if (!regex.validateScope(scope)) {
        return {
            code: 400,
            data: regex.getInvalidScopeResponse(scope)
        };
    }

    const result1 = await db('polls')
        .returning('id')
        .insert({
            display_name, theme,
            creator, duration, scope,
            image_1, image_2,
            state: 'active',
            type: 'personal',
            start_time: "",
            end_time: ""
        })
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });
    
    if (!!result1.code) {
        return result1;
    }

    const result2 = User.incrementPollsCreated(db, creator, 1);
    if (!!result2.code) {
        return result2;
    }

    return {
        code: 200,
        data: result1[0]
    };
}

// creates a new challenge poll
async function createChallenge(db, display_name, theme, creator, opponent, duration, scope, image) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateDisplayName(display_name)) {
        return {
            code: 400,
            data: regex.getInvalidDisplayNameResponse(display_name)
        };
    }

    if (!regex.validateTheme(theme)) {
        return {
            code: 400,
            data: regex.getInvalidThemeResponse(theme)
        };
    }

    if (!regex.validateUsername(creator)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(creator)
        };
    }

    if (!regex.validateUsername(opponent)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(opponent)
        };
    }

    if (!regex.validateDuration(duration)) {
        return {
            code: 400,
            data: regex.getInvalidDurationResponse(duration)
        };
    }

    if (!regex.validateScope(scope)) {
        return {
            code: 400,
            data: regex.getInvalidScopeResponse(scope)
        };
    }

    if (creator === opponent) {
        return {
            code: 400,
            data: 'You cannot challenge yourself.'
        };
    }

    // check to make sure the creator and opponent are friends
    const areFriends = await Friend.areFriends(db, creator, opponent);
    if (!(typeof areFriends === 'boolean')) {
        return areFriends;
    }

    if (!areFriends) {
        return {
            code: 400,
            data: 'you can only send a challenge poll request to a friend'
        };
    }

    const result = await db('polls')
        .returning('id')
        .insert({
            display_name, theme,
            creator, opponent,
            duration, scope,
            image_1: image,
            type: 'challenge'
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
        data: result[0]
    };
}

// returns all of your challenge requests
async function getChallengeRequests(db, username) {
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

    const result = await db('polls')
        .where({
            opponent: username,
            state: 'pending',
            type: 'challenge'
        })
        .select('id', 'display_name', 'theme', 'creator', 'opponent', 'scope', 'duration')
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

// accepts a challenge request
async function acceptChallengeRequest(db, id, username, image) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validatePollId(id)) {
        return {
            code: 400,
            data: regex.getInvalidPollIdResponse(id)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    const result = await db('polls')
        .where({
            id,
            opponent: username,
            state: 'pending',
            type: 'challenge'
        })
        .update({
            'image_2': image,
            state: 'ready'
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
        data: 'success'
    };
}

// returns all of your accepted challenge requests
async function getAcceptedChallengeRequests(db, username) {
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

    const result = await db('polls')
        .where({
            creator: username,
            state: 'ready',
            type: 'challenge'
        })
        .select('id', 'display_name', 'theme', 'creator', 'opponent', 'scope', 'duration')
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

// starts a challenge poll
async function startChallenge(db, id, username) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validatePollId(id)) {
        return {
            code: 400,
            data: regex.getInvalidPollIdResponse(id)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    const result1 = await db('polls')
        .where({
            id,
            creator: username,
            state: 'ready',
            type: 'challenge'
        })
        .update({
            state: 'active',
            start_time: '',
            end_time: ''
        })
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result1.code) {
        return result1;
    }

    if (result1 !== 1) {
        return {
            code: 400,
            data: 'no challenge poll in the ready state with creator=' + username + ' and id=' + id
        };
    }
    
    const result2 = User.incrementPollsCreated(db, username, 1);
    if (!!result2.code) {
        return result2;
    }

    return {
        code: 200,
        data: 'success'
    };
}

// returns a list of private polls based on theme
async function searchPrivate(db, themes_query) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateThemesQuery(themes_query)) {
        return {
            code: 400,
            data: regex.getInvalidThemesQueryResponse(themes_query)
        };
    }

    // convert 'theme,theme,theme' into [theme, theme, theme]
    const themes = themes_query.split(',');

    // get a list of this user's friends by their username
    const friends = await Friend.get(db, username);
    if (friends.code !== 200) {
        return friends;
    }

    const friendUsernames = friends.data.map(f => f.username);
    friendUsernames.push(username);

    const result = await db('polls')
        .whereIn('theme', themes)
        .andWhere({
            state: 'active',
            scope: 'private'
        })
        .andWhere(() => {
            this.
                whereIn('creator', friendUsernames)
                .orWhereIn('opponent', friendUsernames)
        })
        .select('display_name', 'theme', 'creator', 'opponent', 'type', 'scope', 'duration')
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

// returns a list of public polls based on theme
async function searchPublic(db, themes_query) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validateThemesQuery(themes_query)) {
        return {
            code: 400,
            data: regex.getInvalidThemesQueryResponse(themes_query)
        };
    }

    const themes = themes_query.split(',');

    const result = await db('polls')
        .whereIn('theme', themes)
        .andWhere({
            state: 'active',
            scope: 'public'
        })
        .select('display_name', 'theme', 'creator', 'opponent', 'type', 'scope', 'duration')
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

// adds vote to poll choice
async function vote(db, id, username, vote) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validatePollId(id)) {
        return {
            code: 400,
            data: regex.getInvalidPollIdResponse(id)
        };
    }

    if (!regex.validateUsername(username)) {
        return {
            code: 400,
            data: regex.getInvalidUsernameResponse(username)
        };
    }

    vote = parseInt(vote);
    if (!regex.validatePollVote(vote)) {
        return {
            code: 400,
            data: regex.getInvalidPollVoteResponse(vote)
        };
    }

    const result1 = await db('history')
        .where({
            username,
            poll: id
        })
        .select('vote')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result1.code) {
        return result1;
    }
    
    // if results exist, then this user has already voted on this poll
    // if (result1.length > 0) {
    //     return {
    //         code: 400,
    //         data: 'already voted on poll: ' + id
    //     };
    // }

    const result2 = await db('polls')
        .where({
            id,
            state: 'active'
        })
        .increment({
            votes_1: ((vote === 1)? 1 : 0),
            votes_2: ((vote === 2)? 1 : 0)
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

    const result3 = await db('history')
        .insert({
            username, vote,
            poll: id
        })
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
        data: 'success'
    };
}

// returns a single poll's data by id
async function getById(db, username, id) {
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

    if (!regex.validatePollId(id)) {
        return {
            code: 400,
            data: regex.getInvalidPollIdResponse(id)
        };
    }

    const result1 = await db('polls')
        .where('id', id)
        .select('id', 'display_name', 'theme', 'creator', 'opponent', 'image_1', 'image_2', 'votes_1', 'votes_2', 'state', 'type', 'duration', 'scope', 'start_time', 'end_time')
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result1.code) {
        return result1;
    }
    
    // if no results, then no poll exists with that id
    if (result1.length !== 1) {
        return {
            code: 400,
            data: 'no poll found with id: ' + id
        };
    }

    const poll = result1[0];

    // update poll to show whether or not the 
    // user calling this has already voted on it
    const result2 = await db('history')
        .where({
            username,
            poll: id
        })
        .select()
        .catch(e => {
            return {
                code: 500,
                data: e.originalStack
            };
        });

    if (!!result2.code) {
        return result2;
    }

    // if there is a result, then the user has already voted on it
    if (result2.length === 1) {
        poll.voted = result2[0].vote;
    }

    return {
        code: 200,
        data: poll
    };
}

module.exports = {
    createPersonal, createChallenge,
    getChallengeRequests,
    acceptChallengeRequest,
    getAcceptedChallengeRequests,
    startChallenge,
    searchPrivate, searchPublic,
    vote, getById
}
