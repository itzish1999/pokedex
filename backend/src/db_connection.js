const Pool = require("pg").Pool;

const db_client = new Pool();

// db_client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
// })

module.exports = db_client