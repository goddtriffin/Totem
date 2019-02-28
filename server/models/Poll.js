const regex = require('../../shared/regex');
const utils = require('../tools/utils');

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

    const result = await db('polls')
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
    
    if (!!result.code) {
        return result;
    }

    return {
        code: 200,
        data: result[0]
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
        .select('id', 'display_name', 'theme', 'creator', 'opponent', 'scope')
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
        .select('id', 'display_name', 'theme', 'creator', 'opponent', 'scope')
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

    const result = await db('polls')
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

    if (!!result.code) {
        return result;
    }

    return {
        code: 200,
        data: 'success'
    };
}

// returns a list of polls
async function search(db, display_name_query) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        };
    }

    if (!regex.validatePollDisplayNameQuery(display_name_query)) {
        return {
            code: 400,
            data: regex.getInvalidPollDisplayNameQueryResponse(display_name_query)
        };
    }

    const result = await db('polls')
        .where({
            state: 'active',
            scope: 'public'
        })
        .andWhere('display_name', 'like', '%' + display_name_query + '%')
        .select('display_name', 'theme', 'creator', 'opponent', 'type', 'scope')
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
    if (result1.length > 0) {
        return {
            code: 400,
            data: 'already voted on poll: ' + id
        };
    }

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
async function getById(db, id) {
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

    const result = await db('polls')
        .where('id', id)
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
    
    // if no results, then no poll exists with that id
    if (result.length !== 1) {
        return {
            code: 400,
            data: 'no poll found with id: ' + id
        };
    }

    return {
        code: 200,
        data: result[0]
    };
}

module.exports = {
    createPersonal, createChallenge,
    getChallengeRequests,
    acceptChallengeRequest,
    getAcceptedChallengeRequests,
    startChallenge,
    search, vote, getById
}
