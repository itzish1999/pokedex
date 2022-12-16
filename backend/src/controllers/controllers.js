const pokemonModel = require('../models/index');

module.exports = {
    getAllPokemonController: async (req, res, next) => {
        const pokemon = await pokemonModel.getAllPokemonQuery().then((result) => {
            return result;
        }).catch(err => console.log(err));

        res.json(pokemon);
    },

    // getPokemonFromNameController: (req, res, next) => {
    //     const pokemon = pokemonModel.getPokemonFromNameQuery();
    //     res.send(pokemon)
    // }
}