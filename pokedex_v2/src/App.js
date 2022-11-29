import React, { useState, useEffect } from "react";
import axios from "axios"
import Card from "./components/Card";
import Heading from "./components/Heading";
import './App.css';


function App() {
  const [pokemonURL, setPokemonURL] = useState([]);

  const fetchPokemonNames = async () => {
    await axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        setPokemonURL(res.data.results);
      }).catch(err => console.log(err))
  };


  useEffect(() => {
    fetchPokemonNames();
  }, []);

  console.log("IS THE STATE UPDATED:::: ", pokemonURL)
  // we have 20 URLs we need to be able to go into each one. How can we do that?



  // if (pokemonURL && pokemonURL.length > 0) {
  //   axios.get(data.url)

  // }


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
