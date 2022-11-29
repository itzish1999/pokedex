import React, { useState, useEffect } from "react";
import axios from "axios"
import Card from "./components/Card";
import Heading from "./components/Heading";
import './App.css';


function App() {
  const [pokemonURL, setPokemonURL] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});

  const fetchPokemonNames = async () => {
    await axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        setPokemonURL(res.data.results);
      }).catch(err => console.log(err))
  };


  useEffect(() => {
    fetchPokemonNames();
    test();
  }, []);

  console.log("IS THE STATE UPDATED:::: ", pokemonURL)
  // We have 20 URLs we need to be able to go into each one. How can we do that?


  /* If statement is just a check. See if the data is returned then .map over the data, 
  axios into the url and then return data */
  function test() {
    if (pokemonURL && pokemonURL.length > 0) {
      pokemonURL.map(data => {
        axios.get(data.url).then(res => {
          setPokemonDetails(res.data)
        })
      })
    }
  }
  console.log("Pokemon Data :::: ", pokemonDetails)

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
