const express = require('express');
const { PORT } = require('../config');
const pokemonRoutes = require("./Routes/routes");

const app = express();
app.use(pokemonRoutes);

app.get('/', (req, res) => {
    res.send("Hello World")
})


app.listen(PORT, () => console.log(`Node server is running on PORT ${PORT}`));