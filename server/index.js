const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("Hello World!"));

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

const server = app.listen(port, () => {
    console.log('Listening on http://localhost:' + port)}
);
