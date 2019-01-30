require('dotenv').config();
const app = require('express')();

const db = require('knex')({
    client: "sqlite3",
    connection: {
        filename: "./db/" + ((process.env.NODE_ENV === 'production')? 'prod' : 'dev') + ".db"
    },
    useNullAsDefault: true,
    debug: true,
    asyncStackTraces: true
});

// basic url
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// get a list of all users
app.get('/api/users', async (req, res) => {
    const result = await db
        .select('email', 'username', 'display_name', 'hash')
        .table('users');

    res.status(200).send(result);
});

// sign a new user up
app.get('/api/signup', async (req, res) => {
    const requirements = {
        email: req.query.email,
        username: req.query.username,
        display_name: req.query.display_name,
        hash: req.query.password
    };

    if (!validateObject(requirements, ['email', 'username', 'display_name', 'hash'])) {
        res.status(400).send('400: malformed parameters; /api/signup?email=&username=&display_name=&password=');
        return;
    }

    const result = await db
        .insert(requirements)
        .into('users')
        .catch(e => {
            res.status(400).send(e);
            return;
        });
    
    res.status(200).send(result);
});

// any other url, send 404
app.use((req, res, next) => {
    res.status(404).send('404 ;)');
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on http://localhost:' + server.address().port);
});

function validateObject(object, properties) {
    return properties.every(p => object[p]);
}
