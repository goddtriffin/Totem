const jwt = require('jsonwebtoken');

function validate(req, res) {
    try {
        if (!req.headers.authorization || 
            req.headers.authorization.split(' ').length !== 2 || 
            req.headers.authorization.split(' ')[0] !== 'Bearer') {
            return {
                code: 401,
                info: 'invalid auth header; Authorization: Bearer <JWT>'
            };
        }

        req.jwt = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
        return {
            code: 200,
            info: 'success'
        }
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
