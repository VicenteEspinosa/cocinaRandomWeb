import React from 'react';
import DisplayRecipes from './components/PageRecipes/DisplayRecipes';
import CreateRecipe from './components/CreateRecipe/CreateRecipe'
import OneRecipe from './components/OneRecipe/OneRecipe'
import RandomRecipe from './components/RandomRecipe/RandomRecipe'
import Nav from './components/Nav'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {

  return(
    <Router>
      <Nav/>
    <Route path="/" exact component={DisplayRecipes} />
    <Route path="/receta" exact component={CreateRecipe} />
    <Route path="/receta/:id" component={OneRecipe} />
    <Route path="/aleatoria" component={RandomRecipe} />
    
    </Router>

  );
}

export default App;
