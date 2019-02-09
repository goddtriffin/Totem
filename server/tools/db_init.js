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
    debug: true,
    asyncStackTraces: true
});

async function create_users_table() {
    await db.schema.hasTable('users').then(exists => {
        if (!exists) {
            return db.schema.createTable('users', table => {
                table.string('email').unique();
                table.string('username').unique();
                table.string('display_name');
                table.string('hash');

                table.string('emoji');  // make this a char?
                
                table.integer('friend_challenges');
                table.integer('friend_challenges_won');
                table.integer('tiki_score');  // 2x tikis on votes to your picture, 1x tikis on votes to the opponents pictures
                table.integer('polls_created');
            });
        }
    });
}

async function create_friends_table() {
    await db.schema.hasTable('friends').then(exists => {
        if (!exists) {
            return db.schema.createTable('friends', table => {
                table.string('username_1');
                table.string('username_2');
                table.string('state');  // pending , accepted
            });
        }
    });
}

async function create_polls_table() {
    await db.schema.hasTable('polls').then(exists => {
        if (!exists) {
            return db.schema.createTable('polls', table => {
                table.increments('id').unique();
                table.string('display_name');
                table.string('theme');

                table.string('creator');  // user table 'username'
                table.string('opponent').nullable();  // user table 'username'
                table.string('image_1');  // filepath
                table.string('image_2').nullable();;  // filepath
                table.integer('votes_1');
                table.integer('votes_2');

                table.string('state');  // pending, ready, active, expired
                table.string('type');  // private, public
                table.integer('duration');  // TODO change this from 'integer' to 'string'
                table.timestamp('start_time').nullable();  // created when state changes from 'ready' to 'active'
                table.timestamp('end_time').nullable();  // created when state changes from 'ready' to 'active'
            });
        }
    });
}

async function create_history_table() {
    await db.schema.hasTable('history').then(exists => {
        if (!exists) {
            return db.schema.createTable('history', table => {
                table.string('username');
                table.integer('post');
                table.integer('vote');  // 1=creator , 2=opponent
            });
        }
    });
}

(async () => {
    await Promise.all([
        create_users_table(),
        create_friends_table(),
        create_polls_table(),
        create_history_table()
    ]);
})().then(() => {
    process.exit(0);
}).catch(e => {
    console.error('error', e);
    process.exit(1);
});
