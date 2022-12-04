const express = require("express");

const router = express.Router();

// Home page route.
router.get("/pokemon", function (req, res) {
    res.send("Pokemon page");
});

// About page route.
router.get("/pokemon/getall", function (req, res) {
    res.send("Get all pokemon");
});

router.get(`/pokemon/${pokemonName}`, function (req, res) {
    res.send("Get specific pokemon")
});

export default router;