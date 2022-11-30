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
      axios.get(data.url).then(res => {
        console.log("Mapped into url to present pokemon details", res.data)
        setPokemonDetails(res.data)
      })
    })
  }

  function fetchPokemon() {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        console.log("Get pokemon names and urls", res.data)
        setPokemonURLS(res.data.results, () => { console.log("hbh") })
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

  // console.log("IS THE STATE UPDATED:::: ", pokemonURL)
  // We have 20 URLs we need to be able to go into each one. How can we do that?


  /* If statement is just a check. See if the data is returned then .map over the data, 
  axios into the url and then return data */


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
