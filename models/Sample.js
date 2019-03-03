const regex = require('../tools/regex');

// info
async function routeModel(db) {
    if (!regex.validateDatabase(db)) {
        return {
            code: 500,
            data: regex.getInvalidDatabaseResponse(db)
        };
    }

    return {
        code: 501,
        data: 'not implemented'
    };
}

module.exports = {
    routeModel
}
