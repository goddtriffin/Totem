// handle program usage
if (process.argv.length != 3) {
    console.error('Usage: node db_setup.js <database-name>');
    process.exit(1);
}

// set which database to use
const databasePath = "./db/" + process.argv[2] + ".db";

// connect to knex => sqlite3 => database
const db = require('knex')({
    client: "sqlite3",
    connection: {
        filename: databasePath
    },
    useNullAsDefault: true,
    debug: true,
    asyncStackTraces: true
});

async function create_users_table() {
    await db.schema.hasTable('users').then(exists => {
        if (!exists) {
            return db.schema.createTable('users', table => {
                table.increments('id');
	
                table.string('email').unique();
                table.string('username').unique();
                table.string('display_name');

                table.string("hash");
            });
        }
    });
}

(async () => {
    await create_users_table();
})().then(() => {
    process.exit(0);
}).catch(e => {
    console.error('error', e);
    process.exit(1);
});
