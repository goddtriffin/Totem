const regex = require('../../shared/regex');
const utils = require('../tools/utils');

// creates a new personal poll
async function createPersonal(db, display_name, theme, creator, duration, image_1, image_2) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        }
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

    const result = await db('polls')
        .returning('id')
        .insert({
            display_name, theme,
            creator, duration,
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
async function createChallenge(db, display_name, theme, creator, opponent, image_1, duration) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        }
    }

    return {
        code: 501,
        data: 'not implemented'
    };
}

// returns all of your challenge requests
async function getChallengeRequests(db) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        }
    }

    return {
        code: 501,
        data: 'not implemented'
    };
}

// accepts a challenge request
async function acceptChallengeRequest(db) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        }
    }

    return {
        code: 501,
        data: 'not implemented'
    };
}

// returns a single poll's data by id
async function getById(db, id) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        }
    }

    const result = await db('polls')
        .where('id', id)
        .select('id', 'display_name', 'theme', 'creator', 'opponent', 'image_1', 'image_2', 'votes_1', 'votes_2', 'state', 'type', 'duration', 'start_time', 'end_time')
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
    }
}

// returns a list of polls
async function search(db) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        }
    }

    return {
        code: 501,
        data: 'not implemented'
    };
}

// adds vote to poll choice
async function vote(db) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
        }
    }

    return {
        code: 501,
        data: 'not implemented'
    };
}

module.exports = {
    createPersonal, createChallenge,
    getChallengeRequests,
    acceptChallengeRequest,
    getById, search,
    vote
}
