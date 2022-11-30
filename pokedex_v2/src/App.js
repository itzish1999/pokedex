import React, { useState, useEffect } from "react";
import axios from "axios"
import Card from "./components/Card";
import Heading from "./components/Heading";
import './App.css';


function App() {
  const [pokemonURLS, setPokemonURLS] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});

  function fetchPokemonDetails() {
    pokemonURLS.map(data => {
      return (
        axios.get(data.url).then(res => {
          console.log("Mapped into url to present pokemon details", res.data)

          const data = res.data;
          const name = data.name;
          const image = data.sprites.front_default;
          const forms = data.forms[0].name;
          const abilityArray = data.abilities;
          const moves = data.moves;
          // console.log("Testing Seeing Data :::: " + JSON.stringify(moves)); // Test if data loads properly

          setPokemonDetails(res.data)
        }))
    })
  }

  function fetchPokemon() {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        console.log("Get pokemon names and urls", res.data.results)
        setPokemonURLS(res.data.results, () => { })
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    if (!pokemonURLS.length > 0) {
      fetchPokemon()
    }
  });

  useEffect(() => {
    if (pokemonURLS.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonURLS]);

  return (
    <div className="App">
      <div className="heading">
        <Heading />
      </div>
      <div className="body">

        <Card
          pokemonName="Bulbasaur" // Testing to see if card works
        />
      </div>
    </div>
  );
}

export default App;
