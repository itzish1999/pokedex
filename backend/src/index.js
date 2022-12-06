const express = require('express');
const axios = require('axios');
const { response } = require('express');

const app = express();

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

app.get('/pokemon/getAll', async (req, res) => {
    const pokemon = await getAllPokemon();
    pokemon.length > 0 ? res.send(pokemon) : res.send("No Pokemon Found")
});

app.get('/', (req, res) => {
    res.send("Hello World")
    console.log(res)
})

app.listen(8080, () => console.log('Node server is running on PORT 8080'));