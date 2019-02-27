const themes = [
    'meme',
    'fashion'
];

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
    return 'Invalid duration: ' + duration + '. Should match: idk';
}

module.exports = {
    validateEmail, getInvalidEmailResponse,
    validateUsername, getInvalidUsernameResponse,
    validateDisplayName, getInvalidDisplayNameResponse,
    validatePassword, getInvalidPasswordResponse,
    validateUsernameQuery, getInvalidUsernameQueryResponse,
    validateTheme, getInvalidThemeResponse,
    validateDuration, getInvalidDurationResponse
}
