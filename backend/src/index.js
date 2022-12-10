const express = require('express');
const axios = require('axios');

const app = express();

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

const getAllPokemon = async () => {
    try {
        const headers = {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        };
        const { data: response } = await axios.get('https://pokeapi.co/api/v2/pokemon', headers);
        return response.results;
    } catch (err) {
        console.error(err);
    }
};

async function getAllPokemonDetails(pokemon) {
    const headers = {
        headers: {
            'Accept-Encoding': 'application/json',
        }
    };
    const transformedPokemonArray = pokemon.map(async pokemonDetail => {
        return await axios.get(pokemonDetail.url, headers).then(res => {

            const { name, sprites: { front_default }, forms, abilities, moves, base_experience } = res.data;

            // name , sprites, forms, abilities, moves, base_experience

            //create table with above 6 columns
            // create an insert sql statement as a sample
            // fetch that sample inserted with a select * from tableName where name = sampleName
            // learn how to alter table to add more columns or change primary key, what is primary key?


            const test = {
                name,
                image: front_default,
                form: forms[0].name,
                abilities,
                moves,
                experience: base_experience
            };
            pokemonDetail = test;
            return pokemonDetail;
        }).catch(err => {
            console.log(err);
        })
    })
    const resolvedPromises = await Promise.all(transformedPokemonArray)
    return resolvedPromises
}

app.get('/pokemon/getAll', async (req, res) => {
    const pokemon = await getAllPokemon();
    const pokemonDetails = await getAllPokemonDetails(pokemon);
    pokemonDetails.length > 0 ? res.send(pokemonDetails) : res.send("No Pokemon Found")
});

app.get('/', (req, res) => {
    res.send("Hello World")
    console.log(res)
})

const { PORT } = require('../config');
app.listen(PORT, () => console.log(`Node server is running on PORT ${PORT}`));