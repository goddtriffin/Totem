require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');

if (isNaN(process.env.PORT)) {
    console.log('Error: must copy .env.sample => .env and then fill it out (PORT: number)');
    process.exit(1);
}

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'YOUR_JWT_SECRET') {
    console.log('Error: must copy .env.sample => .env and then fill it out (JWT_SECRET: string)');
    process.exit(1);
}

// connect to the database (knex => SQLite3 => SQLite)
app.locals.db = require('knex')({
    client: "sqlite3",
    connection: {
        filename: "./db/" + ((process.env.NODE_ENV === 'production')? 'prod' : 'dev') + ".db"
    },
    useNullAsDefault: true,
    debug: !process.env.NODE_ENV,
    asyncStackTraces: !process.env.NODE_ENV
});

app.locals.utils = require('./tools/utils');  // helper methods

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));  // all endpoints

const server = app.listen(process.env.PORT || 80, () => {
    console.log('Listening on http://localhost:' + server.address().port);
});
