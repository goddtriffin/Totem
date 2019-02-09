function create(databasePath, useNullAsDefault, debug, asyncStackTraces) {
    return require('knex')({
        client: "sqlite3",
        connection: {
            filename: databasePath
        },
        useNullAsDefault,
        debug,
        asyncStackTraces
    });
}

module.exports = {
    create
}