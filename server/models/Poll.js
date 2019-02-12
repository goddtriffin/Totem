const utils = require('../tools/utils');

// creates a new personal poll
async function createPersonal(db) {
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

// creates a new friend poll
async function createChallenge(db) {
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

// accepts or rejects a friend poll request
async function respondToChallengeRequest(db) {
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

// returns all of your challenge requests
async function getChallengeRequests(db) {
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

// returns a list of polls
async function search(db) {
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

// adds vote to poll choice
async function vote(db) {
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
    createPersonal, createChallenge,
    respondToChallengeRequest,
    getChallengeRequests, search,
    vote
}
