import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonData, setPokemonData] = useState({
    name: "",
    img: "",
    ability: "",
    experience: "",
    forms: ""
  });


  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        // console.log("Getting from Server ::::", res.data)
        setPokemon(res.data)
        console.log("DATA :::: ", res.data)
      }).catch(err => console.log(err))
  }, [])

  function getPokemonData(data) {
    axios.get(data.url).then(res => {
      setPokemonData({
        name: res.data.name,
        img: res.data.sprites.front_default,
        ability: res.data.abilities[0].ability.name,
        experience: res.data.base_experience,
        forms: res.data.forms[0].name
      });
      setPokemonChosen(true)
      console.log(res.data)
    }).catch(err => {
      console.log("Error::: ", err);
    })
  }

  let pokeMap = {};
  const arr = pokemon.results && pokemon.results.length > 0 && pokemon.results.filter((data => {
    if (searchInput === "") {
      return data;
    } else if (data.name.toLowerCase().includes(searchInput.toLowerCase())) {
      //pokeMap[data.name] = data.url;
      pokeMap['name'] = data.name;
      pokeMap['url'] = data.url;
      return data;
    }
    console.log("DATA :::: ", data);
  }))
    .map((data, index) => {
      return (
        <div>
          <th style={{ paddingRight: '5px' }}>
            <td><button onClick={() => getPokemonData(data)}>
              {data.name}
            </button></td>
            <div className="Display">{!pokemonChosen ? (
              <h1>Please Choose a Pokemon</h1>
            ) : (
              <>
                <h1>{pokemonData.name}</h1>
                <img src={pokemonData.img} />
                <h3>Species: {pokemonData.forms}</h3>
                <h3>ability: {pokemonData.ability}</h3>
                <h4>Experience: {pokemonData.experience}</h4>
              </>
            )}
            </div>
          </th>
          <td></td>
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
        <table>
          <tr>
            <th>Name</th>
          </tr>
        </table>
        {arr}
      </form>
    </div>
  );
}

export default App;