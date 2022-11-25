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
    ability: "",
    experience: "",
    abilityList: "",
    forms: ""
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

      console.log("bussy" + JSON.stringify(image));

      setPokemonData({
        name: name,
        img: image,
        abilityList: abilityArray,
        experience: base_experience,
        forms: forms
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
    .map((data, index) => {
      return (
        <div>
          <th style={{ paddingRight: '5px' }}>
            <td><button onClick={() => getPokemonData(data)}>
              {data.name}
            </button></td>
            <div className="Display">{isPokemonChosen && pokemonData.name === data.name && (
              <>
                <h1>{pokemonData.name}</h1>
                <img src={pokemonData.img} />
                <h3>Species: {pokemonData.forms}</h3>

                <h2>Ability:</h2>
                {pokemonData.abilityList.map(abilitiesObject =>
                  <h3>{abilitiesObject.ability.name}</h3>
                )}

                <h4>Experience: {pokemonData.experience}</h4>
              </>
            )}
            </div>
          </th >
          <td></td>
        </div >
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