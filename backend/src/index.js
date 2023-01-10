const express = require('express');
const db_client = require('./db_connection.js');
const { PORT } = require('../config');

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});

app.get('/pokemon/getAll', (req, res) => {
    db_client.query('SELECT * from pokemon', (err, result) => {
        if (!err) {
            res.send(result.rows)
            db_client.end;
        }
    })
})

db_client.connect();



app.get('/', (req, res) => {
    res.send("Hello World")
})


app.listen(PORT, () => console.log(`Node server is running on PORT ${PORT}`));