const utils = require('../tools/utils');

// creates a new personal poll
async function createPersonal(db, display_name, theme, creator, image_1, image_2, duration) {
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
    acceptChallengeRequest, search,
    vote
}
