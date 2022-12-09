const express = require('express');
const axios = require('axios');

const app = express();

const getAllPokemon = async () => {
    try {
        const headers = {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        };
        const { data: response } = await axios.get('https://pokeapi.co/api/v2/pokemon', headers);
        // console.log("Here are the results ::: ", response.results);
        return response.results;
    } catch (err) {
        console.error(err);
    }
};

// Find a way to go through the array that is returned via map and axios get into the urls
async function getAllPokemonDetails(pokemon) {
    const headers = {
        headers: {
            'Accept-Encoding': 'application/json',
        }
    };
    const transformedPokemonArray = pokemon.map(async pokemonDetail => {
        return await axios.get(pokemonDetail.url, headers).then(res => { //works fine

            const { name, sprites: { front_default }, forms, abilities, moves, base_experience } = res.data;
            // This works properly as well

            const test = { // Test Works just like how i wanted it to.
                name,
                image: front_default,
                form: forms[0].name,
                abilities,
                moves,
                experience: base_experience
            }
            pokemonDetail = res.data // pokemonDetail deeeeeefinately works.
            // console.log("PokemonDetails ::: ", pokemonDetail)
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

app.listen(8080, () => console.log('Node server is running on PORT 8080'));