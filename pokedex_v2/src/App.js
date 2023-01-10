import React, { useState, useEffect } from "react";
import axios from "axios"
import Card from "./components/Card";
import Logo from "./components/Logo";
import './App.css';


function App() {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  function fetchPokemon() {
    axios.get("http://localhost:8080/pokemon/getAll")
      .then(res => {
        setPokemonDetails(res.data)
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    if (!pokemonDetails.length > 0) {
      fetchPokemon()
    }
  });

  useEffect(() => {
    if (pokemonDetails.length > 0) {
      fetchPokemon();
    }
  }, []);

  return (
    <div className="App">
      <div className="heading">
        <Logo />
      </div>
      <div className="body">
        <div className="cardContainer">
          {pokemonDetails.map(pokedex => {
            return (
              <Card
                pokemonName={pokedex.name}
                pokemonImage={pokedex.image}
                pokemonForms={pokedex.form}
                pokemonAbilities={pokedex.abilities} // Move to backend
                pokemonMoves={pokedex.moves} // Move to Backend
                pokemonExperience={pokedex.experience}
              />
            )
          })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
