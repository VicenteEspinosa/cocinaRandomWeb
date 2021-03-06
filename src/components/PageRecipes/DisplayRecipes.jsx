import React, {useEffect, useState} from 'react';
import DropdownCategory from '../DropdownCategory';
import '../../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import PageRecipe from './PageRecipes'

const DisplayRecipes = () => {

  const URL = "https://cocina-random-backend.herokuapp.com";
  //const URL = "http://127.0.0.1:8000/"

  const [loading, setLoading] = useState(false);

  const [recipes, setRecipes] = useState([]);

  const [query_name, setQueryName] = useState("");
  
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [query_categories, setQueryCategories] = useState([]);
  
  const [query, setQuery] = useState("");


  useEffect(() => {

    const getRecipes = async () => {
      setLoading(false)
      const response = await fetch(`${URL}/recipes_paginated/?page_size=200&${query}`);
      setLoading(true)
      const data = await response.json();
      setRecipes(data.data);
    };

    getRecipes();
  }, [query])

  useEffect(() => {
    setCategoriesQ(selected);
  }, [selected])

  useEffect(() => {
    getCategories();
  }, [])


  var setCategoriesQ = (selected) => {
    var categories = [];
    {selected.map(category=>(
      categories.push(category.value)
    ))}
    setQueryCategories(categories);
  }

  const getCategories = async () => {
    const categories_response = await fetch(`${URL}/categories`);
    const categories_data = await categories_response.json();
    setCategories(categories_data);
  };

  const updateSearch = e => {
    setQueryName(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(`&categories=${query_categories}&ingredients=&name=${query_name}`)
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">

        <DropdownCategory
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />

        <input className="search-bar" type="text" value={query_name} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
      {loading ? (<PageRecipe recipes={recipes}/>): (
        <ReactBootStrap.Spinner className="spinner" animation="border" />
      )}
      {/* {recipes.map(recipe=>(
        <Recipe
          key={recipe.id}
          id={recipe.id}
          title={recipe.name}
          description={recipe.description}
          image={recipe.image}
          ingredients={recipe.ingredients}
          categories={recipe.categories}
          links={recipe.links}
        />
      ))} */}
    </div>
  );
};


export default DisplayRecipes;
