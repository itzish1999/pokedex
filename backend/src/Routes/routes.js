const express = require("express");
const pokemonRoutes = express.Router();
const pokemonController = require('../controllers/controllers');


pokemonRoutes.get('/pokemon/getAll', pokemonController.getAllPokemonController);

pokemonRoutes.get('/pokemon/choosePokemon', pokemonController.getPokemonFromNameController);

// pokemonRoutes.get(`/pokemon/getFromName/${pokemonName}`, (req, res) => {
//     db_client.query(`SELECT ${pokemonName} from pokemon`, (err, result) => {
//         if (!err) {
//             res.send(result.rows)
//             db_client.end;
//         }
//     })
// });

module.exports = pokemonRoutes;