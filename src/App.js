import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const URL = "https://cocina-random-backend.herokuapp.com";
  //const URL = "http://127.0.0.1:8000/"
    const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes();
  }, [])

  const getRecipes = async () => {
    const response = await fetch(`${URL}/recipes/`);
    const data = await response.json();
    console.log(data)
    setRecipes(data)

  }

  return(
    <div className="App">
      <form className="search-form">
        <h1>Hello React</h1>
        <input className="search-bar" type="text"/>
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
      {recipes.map(recipe=>(
        <Recipe
          key={recipe.id}
          title={recipe.name}
          description={recipe.description}
          image={recipe.image}
        />
      ))}
    </div>
  );
};


export default App;
