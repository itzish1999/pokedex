const express = require("express");
const pokemonRoutes = express.Router();
const pokemonController = require('../controllers/controllers');


pokemonRoutes.get('/pokemon/getAll', pokemonController.getAllPokemonController);

// pokemonRoutes.get('/pokemon/choosePokemon', pokemonController.getPokemonFromNameController);

module.exports = pokemonRoutes;