// create new database knex/sqlite3
async function create(databasePath, useNullAsDefault, debug, asyncStackTraces) {
    const db = require('knex')({
        client: "sqlite3",
        connection: {
            filename: databasePath
        },
        useNullAsDefault,
        debug,
        asyncStackTraces
    });

    await Promise.all([
        createUsersTable(db),
        createFriendsTable(db),
        createPollsTable(db),
        createHistoryTable(db)
    ]);

    return db;
}

// connect to knex => sqlite3 => database
function get(databasePath, useNullAsDefault, debug, asyncStackTraces) {
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

async function createUsersTable(db) {
    await db.schema.hasTable('users').then(exists => {
        if (!exists) {
            return db.schema.createTable('users', table => {
                table.string('email').unique();
                table.string('username').unique().primary();
                table.string('display_name').notNullable();
                table.string('hash').notNullable();

                table.string('emoji', 1).notNullable();
                
                table.integer('challenges_played').notNullable().defaultTo(0);
                table.integer('challenges_won').notNullable().defaultTo(0);
                table.integer('tiki_tally').notNullable().defaultTo(0);  // 2x tikis on votes to your picture, 1x tikis on votes to the opponents pictures
                table.integer('polls_created').notNullable().defaultTo(0);
            });
        }
    });
}

async function createFriendsTable(db) {
    await db.schema.hasTable('friends').then(exists => {
        if (!exists) {
            return db.schema.createTable('friends', table => {
                table.string('username_1').notNullable().references('users.username');
                table.string('username_2').notNullable().references('users.username');
                table.string('state').notNullable().defaultTo('pending');  // pending , accepted
            });
        }
    });
}

async function createPollsTable(db) {
    await db.schema.hasTable('polls').then(exists => {
        if (!exists) {
            return db.schema.createTable('polls', table => {
                table.increments('id').unique().primary();
                table.string('display_name').notNullable();
                table.string('theme').notNullable();

                table.string('creator').notNullable().references('users.username');
                table.string('opponent').nullable().references('users.username');  // challenge only
                table.string('image_1').notNullable();  // filepath
                table.string('image_2').nullable();  // filepath
                table.integer('votes_1').notNullable().defaultTo(0);
                table.integer('votes_2').notNullable().defaultTo(0);

                table.string('state').notNullable().defaultTo('pending');  // (challenge only: pending,) active, expired
                table.string('type').notNullable();  // personal, challenge
                table.string('duration').notNullable();
                table.timestamp('start_time').nullable();  // created when state changes from 'ready' to 'active'
                table.timestamp('end_time').nullable();  // created when state changes from 'ready' to 'active'
            });
        }
    });
}

async function createHistoryTable(db) {
    await db.schema.hasTable('history').then(exists => {
        if (!exists) {
            return db.schema.createTable('history', table => {
                table.string('username').notNullable().references('users.username');
                table.integer('poll').notNullable().references('polls.id');
                table.integer('vote').notNullable();  // 1=creator , 2=opponent
            });
        }
    });
}

// returns a list of all the names of all the tables in the given database
async function getTableNames(db) {
    if (!db) {
        return;
    }

    const result = await db.raw("SELECT name AS table_name FROM sqlite_master WHERE type='table'");
    return result.map(item => item.table_name);
}

// drops all tables in the given database
async function dropAllTables(db) {
    if (!db) {
        return;
    }

    const tables = await getTableNames(db);
    for (let i=0; i<tables.length; i++) {
        // this table is needed in SQLite databases
        if (tables[i] === 'sqlite_sequence') {
            continue;
        }

        await db.schema.dropTableIfExists(tables[i]);
    }
}

module.exports = {
    create, get,
    getTableNames,
    dropAllTables
}
