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
        const { data: response } = await axios.get(
            'https://pokeapi.co/api/v2/pokemon', headers
        );
        console.log(response);
        return response.results;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

app.get('/pokemon/getAll', async (req, res) => {
    const pokemon = await getAllPokemon();
    if (pokemon.length > 0) {
        res.send(pokemon);
    } else {
        res.send("No Pokemon Found");
    }
});

app.get('/', (req, res) => {
    res.send("Hello World")
    console.log(res)
})

app.listen(8080, () => console.log('Node server is running on PORT 8080'));