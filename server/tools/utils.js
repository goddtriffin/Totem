// returns true if the given object contains all the given properties
// object: {} , properties: []
function validateObject(object) {
    return Object.keys(object).every(p => {
        if (object[p] === 0) {
            return true;
        }

        return object[p];
    });
}

// prints all the names of all the tables in the given database (knex => SQLite3 => SQLite)
function printDatabaseTableNames(db) {
    db.raw("SELECT name AS table_name FROM sqlite_master WHERE type='table'").then(function(results) {
        console.log(results);
    });
}

module.exports = {
    validateObject,
    printDatabaseTableNames
}
