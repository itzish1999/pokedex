const db_client = require('../db_connection');

module.exports = {
    getAllPokemonQuery: () => {
        return new Promise((resolve, reject) => {
            db_client.query('SELECT * from pokemon', (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result.rows);
            });
        })
    },

    getPokemonFromNameQuery: (req, res) => {
        try {
            const name = req.params.name;
            db_client.query(`SELECT name FROM pokemon WHERE name = ${name}`, (err, result) => {
                if (!err) {
                    res.send(result.rows);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}