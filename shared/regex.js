// source: https://emailregex.com/
function validateEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function validateUsername(username) {
    if (typeof username !== 'string') {
        return false;
    }

    const re = /^(\S){3,20}$/;
    return re.test(username);
}

function validateDisplayName(display_name) {
    if (typeof display_name !== 'string') {
        return false;
    }

    const re = /^(\S){1,30}$/;
    return re.test(display_name);
}

function validatePassword(password) {
    if (typeof password !== 'string') {
        return false;
    }

    const re = /^(\S){8,30}$/;
    return re.test(password);
}

module.exports = {
    validateEmail,
    validateUsername,
    validateDisplayName,
    validatePassword
}
