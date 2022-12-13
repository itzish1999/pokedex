const express = require("express");
const pokemonRoutes = express.Router();

pokemonRoutes.get('/pokemon/getAll', (req, res) => {
    db_client.query('SELECT * from pokemon', (err, result) => {
        if (!err) {
            res.send(result.rows)
            db_client.end;
        }
    })
});

pokemonRoutes.get(`/pokemon/get/${pokemonName}`, (req, res) => {
    db_client.query(`SELECT ${pokemonName} from pokemon`, (err, result) => {
        if (!err) {
            res.send(result.rows)
            db_client.end;
        }
    })
});
