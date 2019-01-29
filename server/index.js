const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT;

app.get('/', (req, res) => res.send("Hello World!"));

app.use((req, res, next) => {
    res.status(404).send("404 ;)")
});

const server = app.listen(port, () => {
    console.log('Listening on http://localhost:' + port)}
);
