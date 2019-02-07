const jwt = require('jsonwebtoken');

function validate(req, res) {
    try {
        if (!req.headers.authorization || req.headers.authorization.split(' ').length !== 2 || req.headers.authorization.split(' ')[0] !== 'Bearer') {
            res.status(401).send({
                code: 401,
                info: 'invalid auth header; Authorization: Bearer <JWT>'
            });
            return false;
        }

        req.jwt = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
        return true;
    } catch(e) {
        res.status(401).send({
            code: 401,
            info: 'invalid JWT token'
        });
        return false;
    }
}

module.exports = {
    validate
}
