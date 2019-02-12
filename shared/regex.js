// source: https://emailregex.com/
function validateEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateUsername(username) {
    if (typeof username !== 'string') {
        return false;
    }

    const re = /^(\S){3,20}$/;
    return re.test(String(username));
}

module.exports = {
    validateEmail,
    validateUsername
}
