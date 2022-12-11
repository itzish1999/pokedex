import Pokedex from "pokedex-promise-v2";
import pg from "pg";

const pd = new Pokedex();
const client = new pg.Client({
    user: "postgres",
    password: "Unknown1",
    host: "localhost",
    port: 5433,
    database: "pokemon"
})

await client.connect();

try {
    const result = await pd.getPokemonsList({
        limit: 20,
    });
    const arrPokemon = result.results;

    for (let i = 0; i < arrPokemon.length; i++) {
        const r = arrPokemon[i];
        try {
            const p = await pd.getPokemonByName(r.name)

            const query = {
                text: "INSERT INTO pokemon (name, form, image, experience) VALUES ($1, $2, $3, $4)",
                values: [p.name, p.forms.name, p.sprites.front_default, p.base_experience],
            };
            await client.query(query);

            process.stdout.write('.');

        } catch (e) {
            console.error(e);
        }
    }
} catch (e) {
    console.error(e);
}

await client.end();