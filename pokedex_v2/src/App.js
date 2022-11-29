import Card from "./components/Card";
import Heading from "./components/Heading";
import './App.css';


function App() {
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
