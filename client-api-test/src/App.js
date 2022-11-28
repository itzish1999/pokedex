import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [fetchPokemon, setFetchPokemon] = useState([]); //fetches all pokemon
  const [isPokemonChosen, setIsPokemonChosen] = useState(false);// clicked
  const [pokemonData, setPokemonData] = useState({
    name: "",
    img: "",
    forms: "",
    pokemonMoves: "",
    abilityList: "",
    experience: ""
  }); //Data for pkmn

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        // console.log("Getting from Server ::::", res.data)
        setFetchPokemon(res.data)
        console.log("DATA :::: ", res.data)
      }).catch(err => console.log(err))
  }, [])

  function getPokemonData(data) {
    axios.get(data.url).then(res => {

      const data = res.data;
      const name = data.name
      const image = data.sprites.front_default;
      const abilityArray = data.abilities;
      const base_experience = data.base_experience;
      const forms = data.forms[0].name;
      const moves = data.moves

      // console.log("Testing Seeing Data :::: " + JSON.stringify(moves));

      setPokemonData({
        name: name,
        img: image,
        forms: forms,
        abilityList: abilityArray,
        pokemonMoves: moves,
        experience: base_experience
      });
      setIsPokemonChosen(true)
      console.log(res.data)
    }).catch(err => {
      console.log("Error::: ", err);
    })
  }

  // let pokeMap = {};
  const arr = fetchPokemon?.results?.length > 0 && fetchPokemon.results.filter((data => {
    if (searchInput === "") {
      return data;
    } else if (data.name.toLowerCase().includes(searchInput.toLowerCase())) {
      //pokeMap[data.name] = data.url;
      // pokeMap['name'] = data.name;
      // pokeMap['url'] = data.url;
      return data;
    }
    console.log("DATA :::: ", data);
  }))
    .map((data) => {
      return (
        <div style={{ width: '250px', margin: '10px' }}>
          <button onClick={() => getPokemonData(data)}>
            {data.name}
          </button>
          <div>{isPokemonChosen && pokemonData.name === data.name && (
            <>
              <p>{pokemonData.name}</p>
              <img src={pokemonData.img} />

              <p><b>Species:</b> {pokemonData.forms}</p>

              <p><b>abilities:</b> {pokemonData.abilityList.map((abilitiesObject) => {
                return <p className="Abilities">{abilitiesObject.ability.name + ", "}</p>
              })} </p>


              <p><b>Moves:</b> {pokemonData.pokemonMoves.map(movesObject =>
                <p className="Moves">{movesObject.move.name + ", "}</p>
              )}</p>

              <p>Experience: {pokemonData.experience}</p>
            </>
          )}
          </div>
        </div>
      )
    })

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  // console.log("The KEYS are ::::", Object.keys(arr));
  // console.log("The VALUES are ::::", Object.values(arr));

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Here Are Pokemon </h1>
        <input type="text"
          placeholder="Enter Pokemon Name"
          value={searchInput}
          onChange={e => {
            setSearchInput(e.target.value)
          }}
        />
        <button onClick={() => setIsPokemonChosen(false)}>Close</button>
        <div className={'pokemonName'}>
          {arr}
        </div>
      </form>
    </div>
  );
}

export default App;