const express = require('express');
const db_client = require('./db_connection.js');
const { PORT } = require('../config');

const app = express();
db_client.connect();

app.get('/pokemon/getAll', (req, res) => {
    db_client.query('SELECT * from pokemon', (err, result) => {
        if (!err) {
            res.send(result.rows)
            db_client.end;
        }
    })
});

app.get('/', (req, res) => {
    res.send("Hello World")
    console.log(res)
})

app.listen(PORT, () => console.log(`Node server is running on PORT ${PORT}`));