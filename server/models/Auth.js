const jwt = require('jsonwebtoken');

// validates the JWT token against the JWT_SECRET
function validate(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            code: 200,
            data: decoded
        };
    } catch(e) {
        return {
            code: 401,
            info: 'invalid JWT token'
        };
    }
}

module.exports = {
    validate
}
