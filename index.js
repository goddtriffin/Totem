require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
const jobs = require('./tools/jobs');

// make sure JWT_SECRET environment variable is set
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'YOUR_JWT_SECRET') {
    console.log('Error: must copy .env.sample => .env and then fill it out (JWT_SECRET: string)');
    process.exit(1);
}

// make sure the correct databases exist and have been built
if (process.env.NODE_ENV === 'production') {
    if (!fs.existsSync('./db/prod.db')) {
        console.log('Error: must create production database to run production server');
        console.log('run `npm run init-db-prod`');
        process.exit(1);
    }
} else {
    if (!fs.existsSync('./db/dev.db')) {
        console.log('Error: must create development database to run development server');
        console.log('run `npm run init-db-dev`');
        process.exit(1);
    }
}

// connect to the database
const databasePath =  './db/' + ((process.env.NODE_ENV === 'production')? 'prod' : 'dev') + '.db';
app.locals.db = require('./tools/db').get(databasePath,  true, (process.env.NODE_ENV !== 'production'), true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));  // all endpoints

// initialize all cron jobs
jobs.init(app.locals.db);

const server = app.listen(process.env.PORT || 80, () => {
    const port = server.address().port;
    console.log('Listening on http://localhost' + ((port === 80)? '' : ':' + port));

    // start all cron jobs
    jobs.startAll();
});

// handle closing the server 
function cleanup () {
    server.close(() => {
        // close database connection
        app.locals.db.destroy().then(() => {
            process.exit(0);
        });
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcing shut down');
        process.exit(1);
    }, 30*1000);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
