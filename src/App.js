import React, {useEffect, useState} from 'react';
import './App.css';

const App = () => {

  const URL = "https://cocina-random-backend.herokuapp.com";

    const [counter, setCounter] = useState(0)

  useEffect(() => {
    getRecipes();
  }, [])

  const getRecipes = async () => {
    const response = await fetch(`${URL}/recipes/`);
    const data = await response.json();
    console.log(data);

  }

  return(
    <div className="App">
      <form className="search-form">
        <h1>Hello React</h1>
        <input className="search-bar" type="text"/>
        <button className="search-button" type="submit">
          Buscar {counter}
        </button>
      </form>
    </div>
  );
};

// function App() {
//   return (
//     <div className="App">
//         <h1>Hello React</h1>
//     </div>
//   );
// }

export default App;
