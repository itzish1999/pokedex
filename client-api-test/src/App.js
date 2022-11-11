import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        console.log("Getting from Server ::::", res.data)
        setData(res.data)
      }).catch(err => console.log(err))
  }, [])

  let pokeMap = {};
  const arr = data.results && data.results.length > 0 && data.results.filter((data => {
    if (searchInput === "") {
      return data;
    } else if (data.name.toLowerCase().includes(searchInput.toLowerCase())) {
      //pokeMap[data.name] = data.url;
      pokeMap['name'] = data.name;
      pokeMap['url'] = data.url;
      return data;
    }
  }))
    .map((data, index) => {
      return (
        <div>
          <th style={{ paddingRight: '5px' }}>
            <tr>
              <td>{data.name}</td>
            </tr>
          </th>
          <th>
            <tr>
              <td>{data.url}</td>
            </tr>
          </th>
        </div>
      )
    })
  // console.log("The KEYS are ::::", Object.keys(arr));
  // console.log("The VALUES are ::::", Object.values(arr));

  return (
    <div className="App">
      <h1>Here Are Pokemon </h1>
      <input type="text"
        placeholder="Enter Pokemon Name"
        onChange={e => {
          setSearchInput(e.target.value)
        }}
      />
      <table>
        <tr>
          <th>Name</th>
          <th>Url</th>
        </tr>
      </table>
      {arr}
    </div>
  );
}

export default App;