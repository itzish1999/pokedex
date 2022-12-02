import React, { useState, useEffect } from "react";
import axios from "axios"
import Card from "./components/Card";
import Logo from "./components/Logo";
import './App.css';


function App() {
  const [pokemonURLS, setPokemonURLS] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  function fetchPokemonDetails() {
    pokemonURLS.map(data => {
      return (
        axios.get(data.url).then(res => {
          const { name, sprites: { front_default }, forms, abilities, moves, base_experience } = res.data;

          const test = {
            name,
            image: front_default,
            form: forms[0].name,
            abilities,
            moves,
            experience: base_experience
          }
          setPokemonDetails(prevState => ([...prevState, { ...test }]))
        })).catch(err => {
          console.log(err)
        })
    })
  }

  function fetchPokemon() {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
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
                pokemonAbilities={pokedex.abilities.map(abilityList => abilityList.ability.name).join(', ')}
                pokemonMoves={pokedex.moves.map(moveList => moveList.move.name).join(', ')}
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
