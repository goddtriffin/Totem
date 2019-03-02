const regex = require('../shared/regex');
const utils = require('../tools/utils');

// info
async function routeModel(db) {
    if (!utils.validateDatabase(db)) {
        return {
            code: 500,
            data: utils.getInvalidDatabaseResponse(db)
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
