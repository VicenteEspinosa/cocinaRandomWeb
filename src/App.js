import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const URL = "https://cocina-random-backend.herokuapp.com";
  //const URL = "http://127.0.0.1:8000/"

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");


  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`${URL}/recipes_paginated/?page_size=20&categories=&ingredients=&name=${query}`);
    const data = await response.json();
    setRecipes(data.data);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
          key={recipe.id}
          title={recipe.name}
          description={recipe.description}
          image={recipe.image}
          ingredients={recipe.ingredients}
          categories={recipe.categories}
          links={recipe.links}
        />
      ))}
      </div>
    </div>
  );
};


export default App;
