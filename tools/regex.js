const emoji_tool = require('node-emoji');

const themes = ['memes', 'fashion', 'movie', 'music', 'animals', 'nature', 'buildings', 'cities', 'food', 'beauty', 'color', 'space', 'vehicles', 'sports'];
const votes = [1, 2];
const scopes = ['private', 'public'];

// returns true if db is valid, false otherwise
function validateDatabase(db) {
    return !!db;
}

// returns a String dictating what a valid db should look like
function getInvalidDatabaseResponse(db) {
    return 'Invalid database.';
}

// returns true if email is valid, false otherwise
function validateEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }

    // source: https://emailregex.com/
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email.toLowerCase());
}

// returns a String dictating what a valid email should look like
function getInvalidEmailResponse(email) {
    const example = 'localpart@domain.extension';
    return 'Invalid email: ' + email + '. Should match: ' + example;
}

// returns true if username is valid, false otherwise
function validateUsername(username) {
    if (typeof username !== 'string') {
        return false;
    }

    // min length: 3
    // max length: 20
    // no whitespace
    const regexUsername = /^(\S){3,20}$/;
    return regexUsername.test(username);
}

// returns a String dictating what a valid username should look like
function getInvalidUsernameResponse(username) {
    return 'Invalid username: ' + username + '. Should match: min-length=3 max-length=20 no-whitespace';
}

// returns true if display_name is valid, false otherwise
function validateDisplayName(display_name) {
    if (typeof display_name !== 'string') {
        return false;
    }

    // min length: 1
    // max length: 30
    // no whitespace
    const regexDisplayName = /^(\S){1,30}$/;
    return regexDisplayName.test(display_name);
}

// returns a String dictating what a valid display_name should look like
function getInvalidDisplayNameResponse(display_name) {
    return 'Invalid display_name: ' + display_name + '. Should match: min-length=1 max-length=30 no-whitespace';
}

// returns true if password is valid, false otherwise
function validatePassword(password) {
    if (typeof password !== 'string') {
        return false;
    }

    // min length: 8
    // max length: 30
    // no whitespace
    const regexPassword = /^(\S){8,30}$/;
    return regexPassword.test(password);
}

// returns a String dictating what a valid password should look like
function getInvalidPasswordResponse(password) {
    return 'Invalid password: ' + password + '. Should match: min-length=8 max-length=30 no-whitespace';
}

// returns true if emoji is valid, false otherwise
function validateEmoji(emoji) {
    if (typeof emoji !== 'string') {
        return false;
    }

    return emoji_tool.hasEmoji(emoji);
}

// returns a String dictating what a valid emoji should look like
function getInvalidEmojiResponse(emoji) {
    return 'Invalid emoji: ' + emoji + '. Should match: https://www.npmjs.com/package/node-emoji';
}

// returns true if username_query is valid, false otherwise
function validateUsernameQuery(username_query) {
    if (typeof username_query !== 'string') {
        return false;
    }

    // min length: 1
    // max length: 20
    // no whitespace
    const regexUsernameQuery = /^(\S){1,20}$/;
    return regexUsernameQuery.test(username_query);
}

// returns a String dictating what a valid username_query should look like
function getInvalidUsernameQueryResponse(username_query) {
    return 'Invalid username_query: ' + username_query + '. Should match: min-length=1 max-length=20 no-whitespace';
}

// returns true if theme is valid, false otherwise
function validateTheme(theme) {
    if (typeof theme !== 'string') {
        return false;
    }
    
    return themes.includes(theme);
}

// returns a String dictating what a valid theme should look like
function getInvalidThemeResponse(theme) {
    return 'Invalid theme: ' + theme + '. Should match one: ' + themes;
}

// returns true if duration is valid, false otherwise
function validateDuration(duration) {
    if (typeof duration !== 'string') {
        return false;
    }

    return true;
}

// returns a String dictating what a valid duration should look like
function getInvalidDurationResponse(duration) {
    return 'Invalid duration: ' + duration + '. Should match: typeof string';
}

// returns true if poll id is valid, false otherwise
function validatePollId(id) {
    if (typeof id !== 'string') {
        return false;
    }

    return true;
}

// returns a String dictating what a valid poll id should look like
function getInvalidPollIdResponse(id) {
    return 'Invalid poll id: ' + id + '. Should match: typeof string';
}

// returns true if vote is valid, false otherwise
function validatePollVote(vote) {
    if (typeof vote !== 'number') {
        return false;
    }

    return votes.includes(vote);
}

// returns a String dictating what a valid vote should look like
function getInvalidPollVoteResponse(vote) {
    return 'Invalid vote: ' + vote + '. Should match one: ' + votes + ' (1=creator 2=opponent) (typeof number)';
}

// returns true if a themes_query is valid, false otherwise
function validateThemesQuery(themes_query) {
    if (typeof themes_query !== 'string') {
        return false;
    }

    // theme,theme,theme,theme,theme
    const regexThemesQuery = /^(\w{1,20})(\,\w{1,20}){0,4}$/;
    return regexThemesQuery.test(themes_query);
}

// returns a String dictating what a valid themes_query should look like
function getInvalidThemesQueryResponse(themes_query) {
    return 'Invalid themes_query: ' + themes_query + '. Should match: `theme,theme`. Should match up to at most 5: ' + themes;
}

// returns true if scope is valid, false otherwise
function validateScope(scope) {
    if (typeof scope !== 'string') {
        return false;
    }

    return scopes.includes(scope);
}

// returns a String dictating what a valid scope should look like
function getInvalidScopeResponse(scope) {
    return 'Invalid scope: ' + scope + '. Should match one: ' + scopes;
}

// returns true if email verification hash is valid, false otherwise
function validateEmailVerificationHash(hash) {
    return typeof hash === 'string';
}

// returns a String dictating what a valid email verification hash should look like
function getInvalidEmailVerificationHashResponse(hash) {
    return 'Invalid email verification hash: ' + hash + '. Should match: typeof string';
}

module.exports = {
    validateDatabase, getInvalidDatabaseResponse,
    validateEmail, getInvalidEmailResponse,
    validateUsername, getInvalidUsernameResponse,
    validateDisplayName, getInvalidDisplayNameResponse,
    validatePassword, getInvalidPasswordResponse,
    validateEmoji, getInvalidEmojiResponse,
    validateUsernameQuery, getInvalidUsernameQueryResponse,
    validateTheme, getInvalidThemeResponse,
    validateDuration, getInvalidDurationResponse,
    validatePollId, getInvalidPollIdResponse,
    validatePollVote, getInvalidPollVoteResponse,
    validateThemesQuery, getInvalidThemesQueryResponse,
    validateScope, getInvalidScopeResponse,
    validateEmailVerificationHash, getInvalidEmailVerificationHashResponse
}
