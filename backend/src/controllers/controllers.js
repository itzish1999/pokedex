const pokemonModel = require('../models/index');

module.exports = {
    getAllPokemonController: (req, res, next) => {
        const pokemon = pokemonModel.getAllPokemonQuery().then((result) => {
            console.log("What am I :: ", result);
        }).catch(err => console.log(err));
        res.json(pokemon)
    },

    getPokemonFromNameController: (req, res, next) => {
        const pokemon = pokemonModel.getPokemonFromNameQuery();
        res.send(pokemon)
    }
}