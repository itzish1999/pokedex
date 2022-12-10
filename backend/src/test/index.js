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