// creates a new personal poll
async function createPersonal(db) {
    return {
        code: 501,
        data: 'not implemented'
    };
}

// creates a new friend poll
async function createChallenge(db) {
    return {
        code: 501,
        data: 'not implemented'
    };
}

// accepts or rejects a friend poll request
async function respondToChallengeRequest(db) {
    return {
        code: 501,
        data: 'not implemented'
    };
}

// returns all of your challenge requests
async function getChallengeRequests(db) {
    return {
        code: 501,
        data: 'not implemented'
    };
}

// returns a list of polls
async function search(db) {
    return {
        code: 501,
        data: 'not implemented'
    };
}

// adds vote to poll choice
async function vote(db) {
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
