require('dotenv').config();
const app = require('express')();

app.locals.db = require('knex')({
    client: "sqlite3",
    connection: {
        filename: "./db/" + ((process.env.NODE_ENV === 'production')? 'prod' : 'dev') + ".db"
    },
    useNullAsDefault: true,
    debug: !process.env.NODE_ENV,
    asyncStackTraces: !process.env.NODE_ENV
});

app.locals.utils = require('./tools/utils');

app.use(require('./routes'));

const server = app.listen(process.env.PORT || 80, () => {
    console.log('Listening on http://localhost:' + server.address().port);
});
