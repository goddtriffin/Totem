const auth = require('../models/auth');

function validate(req, res, next) {
    // check if JWT is (correctly) set in the request headers
    if (!req.headers.authorization || 
        req.headers.authorization.split(' ').length !== 2 || 
        req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const result =  {
            code: 401,
            info: 'invalid auth header; Authorization: Bearer <JWT>'
        };
        res.status(result.code).send(result);
        return;
    }

    // retrieve the token, validate it
    const token = req.headers.authorization.split(' ')[1];
    const result = auth.validate(token);

    // if not correct, ...
    if (result.code !== 200) {
        res.status(result.code).send(result);
        return;
    }

    // good, store the decoded JWT for later use
    req.jwt = result.data;
    next();
}

module.exports = {
    validate
}
